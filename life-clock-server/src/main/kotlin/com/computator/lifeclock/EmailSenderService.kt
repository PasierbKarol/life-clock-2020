package com.computator.lifeclock

import com.sun.istack.ByteArrayDataSource
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


//@Component
//@ConfigurationProperties(prefix = "spring.mail")
//@PropertySource("classpath:application.properties")
//class EmailConfiguration {
//  lateinit var host: String
//
//  //  @Value("\${spring.mail.port}")
//  lateinit var port: String
//
//  //  @Value("\${spring.mail.username}")
//  lateinit var username: String
//
//  //  @Value("\${spring.mail.password}")
//  lateinit var password: String
//}

@Component
//@EnableConfigurationProperties(EmailConfiguration::class)
class EmailService {

  val sender: String = "info@karolpasierb.pl"

  val pdfCreatorService: PDFCreatorService = PDFCreatorService()

  fun sendPDFByEmail(subject: String,
                     content: ExportToEmailRequest) {
    println("Preparing email setup")
    //create the sender/recipient addresses
    val iaSender = InternetAddress(sender)
    val iaRecipient = InternetAddress(content.personalDetails.email)
    val session = setupEmail()
    println("Preparing email content")

    val outputStream = ByteArrayOutputStream()
    try {
      //construct the text body part
      val textBodyPart = MimeBodyPart()
      val bodyText = (content.personalDetails.name + " " + content.personalDetails.surname)
      textBodyPart.setText(bodyText)

      //now write the PDF content to the output stream
      pdfCreatorService.createPDFForEmail(content, outputStream)
      println("PDF was prepared")
      val bytes: ByteArray = outputStream.toByteArray()

      //construct the pdf body part
      val dataSource: DataSource = ByteArrayDataSource(bytes, "application/pdf")
      val pdfBodyPart = MimeBodyPart()
      pdfBodyPart.dataHandler = DataHandler(dataSource)
      pdfBodyPart.fileName = "Life-Clock-Goals-for-" + content.personalDetails.name + ".pdf"

      //construct the mime multi part
      val mimeMultipart = MimeMultipart()
      mimeMultipart.addBodyPart(textBodyPart)
      mimeMultipart.addBodyPart(pdfBodyPart)

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
        "; server = " + session.properties["mail.smtp.host"] + ", port = " + session.properties["mail.smtp.port"])
    } catch (ex: Exception) {
      ex.printStackTrace()
    } finally {
      outputStream.close()
    }
  }
}

fun setupEmail(): Session {
  val smtpHost = "smtp.mailtrap.io" //replace this with a valid host
  val smtpPort = 2525 //replace this with a valid port
  val username = "a71b15fd06f187"
  val password = "1ac225773a4880"

  val properties = Properties()
  properties["mail.smtp.auth"] = "true";
  properties["mail.smtp.host"] = smtpHost
  properties["mail.smtp.starttls.enable"] = true;
  properties["mail.smtp.port"] = smtpPort

  return Session.getDefaultInstance(properties, object : Authenticator() {
    override fun getPasswordAuthentication(): PasswordAuthentication {
      return PasswordAuthentication(username, password)
    }
  })
}

