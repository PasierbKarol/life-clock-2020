package com.computator.lifeclock

import com.sun.istack.ByteArrayDataSource
import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.PropertySource
import org.springframework.mail.javamail.JavaMailSenderImpl
import org.springframework.mail.javamail.MimeMessageHelper
import org.springframework.stereotype.Component
import java.io.ByteArrayOutputStream
import java.util.*
import javax.activation.DataHandler
import javax.activation.DataSource
import javax.mail.*
import javax.mail.internet.InternetAddress
import javax.mail.internet.MimeBodyPart
import javax.mail.internet.MimeMessage
import javax.mail.internet.MimeMultipart


@Component
@ConfigurationProperties(prefix = "spring.mail")
@PropertySource("classpath:application.properties")
class EmailConfiguration {
  lateinit var host: String

  //  @Value("\${spring.mail.port}")
  lateinit var port: String

  //  @Value("\${spring.mail.username}")
  lateinit var username: String

  //  @Value("\${spring.mail.password}")
  lateinit var password: String
}

// NEW ATTEMPT
internal interface EmailService {
  fun sendMessageWithAttachment(subject: String,
                                content: ExportToEmailRequest,
                                pathToAttachment: String)

  fun sendHtmlMessage(subject: String,
                      content: ExportToEmailRequest)
}


@Component
@EnableConfigurationProperties(EmailConfiguration::class)
class EmailServiceImpl : EmailService {

  val sender: String = "info@karolpasierb.pl"

  @Bean
  fun mailSender(): JavaMailSenderImpl {
//    val emailConfiguration = EmailConfiguration()
    val javaMailSender = JavaMailSenderImpl()
//    javaMailSender.host = emailConfiguration.host
//    javaMailSender.port = emailConfiguration.port.toInt()
//    javaMailSender.username = emailConfiguration.username
//    javaMailSender.password = emailConfiguration.password

    javaMailSender.host = "smtp.mailtrap.io"
    javaMailSender.port = 2525
    javaMailSender.username = "a71b15fd06f187"
    javaMailSender.password = "1ac225773a4880"

    return javaMailSender
  }

  val emailSender: JavaMailSenderImpl = mailSender()
  val pdfCreatorService: PDFCreatorService = PDFCreatorService()


  override fun sendMessageWithAttachment(subject: String,
                                         content: ExportToEmailRequest,
                                         pathToAttachment: String) {
    try {
      val message = emailSender.createMimeMessage()
      val helper = MimeMessageHelper(message, true)

      helper.setTo(content.personalDetails.email)
      helper.setFrom(sender)
      helper.setSubject(subject)
      val bodyText = (content.personalDetails.name + " " + content.personalDetails.surname + ", Twoje Cele: " + content.goals)
//      helper.setText(bodyText)
      val textBodyPart = MimeBodyPart()
      textBodyPart.setText(bodyText)


//      val pdfInBytes: ByteArray = pdfCreatorService.createPDFForEmail(content).toByteArray()


      //construct the pdf body part
//      val dataSource = ByteArrayDataSource(pdfInBytes, "application/pdf")
//      val pdfBodyPart = MimeBodyPart()
//      pdfBodyPart.dataHandler = DataHandler(dataSource)
//      pdfBodyPart.fileName = "life-clock-goals.pdf"
//
//      val file = FileSystemResource(File(pdfBodyPart.toString()))
//      helper.addAttachment(pdfBodyPart.fileName, file)

      //construct the mime multi part
      val mimeMultipart = MimeMultipart()
      mimeMultipart.addBodyPart(textBodyPart)
//      mimeMultipart.addBodyPart(pdfBodyPart)

//      val mimeMessage = MimeMessage()
//      mimeMessage.setSender(sender)
//      mimeMessage.setSubject(subject)
//      mimeMessage.setRecipient(Message.RecipientType.TO, recipient)
//      mimeMessage.setContent(mimeMultipart)
      
      emailSender.send(message)
    } catch (e: MessagingException) {
      e.printStackTrace()
    }

  }

  override fun sendHtmlMessage(subject: String,
                               content: ExportToEmailRequest) {
    val smtpHost = "smtp.mailtrap.io" //replace this with a valid host
    val smtpPort = 2525 //replace this with a valid port
    val sender = sender //replace this with a valid sender email address
    val username = "a71b15fd06f187"
    val password = "1ac225773a4880"

    val properties = Properties()
    properties.put("mail.smtp.auth", "true");
    properties.put("mail.smtp.host", smtpHost)
    properties.put("mail.smtp.starttls.enable", true);
    properties.put("mail.smtp.port", smtpPort)

    val session: Session = Session.getDefaultInstance(properties, object : Authenticator() {
      override fun getPasswordAuthentication(): PasswordAuthentication {
        return PasswordAuthentication(username, password)
      }
    })

    var outputStream: ByteArrayOutputStream? = null
    try {
      //construct the text body part
      val textBodyPart = MimeBodyPart()
      val bodyText = (content.personalDetails.name + " " + content.personalDetails.surname)
      textBodyPart.setText(bodyText)

      //now write the PDF content to the output stream
      outputStream = ByteArrayOutputStream()
      pdfCreatorService.createPDFForEmail(content, outputStream)
      val bytes: ByteArray = outputStream.toByteArray()

      //construct the pdf body part
      val dataSource: DataSource = ByteArrayDataSource(bytes, "application/pdf")
      val pdfBodyPart = MimeBodyPart()
      pdfBodyPart.dataHandler = DataHandler(dataSource)
      pdfBodyPart.fileName = "test.pdf"

      //construct the mime multi part
      val mimeMultipart = MimeMultipart()
      mimeMultipart.addBodyPart(textBodyPart)
      mimeMultipart.addBodyPart(pdfBodyPart)

      //create the sender/recipient addresses
      val iaSender = InternetAddress(sender)
      val iaRecipient = InternetAddress(content.personalDetails.email)

      //construct the mime message
      val mimeMessage: MimeMessage = MimeMessage(session)
      mimeMessage.sender = iaSender
      mimeMessage.subject = subject
      mimeMessage.setRecipient(Message.RecipientType.TO, iaRecipient)
      mimeMessage.setContent(mimeMultipart)

      //send off the email
      Transport.send(mimeMessage)
      println("sent from " + sender +
        ", to " + content.personalDetails.email +
        "; server = " + smtpHost + ", port = " + smtpPort)
    } catch (ex: Exception) {
      ex.printStackTrace()
    } finally {
      //clean off
      if (null != outputStream) {
        try {
          outputStream.close()
        } catch (ex: Exception) {
        }
      }
    }
  }
}
