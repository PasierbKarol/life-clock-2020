package com.computator.lifeclock

import com.sun.istack.ByteArrayDataSource
import org.springframework.boot.context.properties.ConfigurationProperties
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
@ConfigurationProperties(prefix = "blog")
class EmailConfiguration {
  lateinit var host: String
  lateinit var port: String
  lateinit var username: String
  lateinit var password: String
}

@Component
class EmailService(val emailConfiguration: EmailConfiguration) {

  val sender: String = "info@karolpasierb.pl"

  val pdfCreatorService: PDFCreatorService = PDFCreatorService()

  fun sendPDFByEmail(details: PersonalDetails, goals: List<LifeGoal>) {
    val subject = "Cześć ${details.name}! Oto Twoje cele z programu Zegar Życia!"
    println("Preparing email setup")

    //create the sender/recipient addresses
    val iaSender = InternetAddress(sender)
    val iaRecipient = InternetAddress(details.email)
    val session = setupEmail(emailConfiguration)
    println("Preparing email content")

    val outputStream = ByteArrayOutputStream()
    try {

      //construct the text body part
      val textBodyPart = MimeBodyPart()
      val bodyText = (details.name + " " + details.surname)
      textBodyPart.setText(bodyText)

      //now write the PDF content to the output stream
      println("Creating document")
      pdfCreatorService.preparePDFForOutput(goals, outputStream)
      val bytes: ByteArray = outputStream.toByteArray()

      //construct the pdf body part
      val dataSource: DataSource = ByteArrayDataSource(bytes, "application/pdf")
      val pdfBodyPart = MimeBodyPart()
      pdfBodyPart.dataHandler = DataHandler(dataSource)
      pdfBodyPart.fileName = getPDFFileName(details.name)

      //construct the mime multi part
      val mimeMultipart = MimeMultipart()
      mimeMultipart.addBodyPart(textBodyPart)
      mimeMultipart.addBodyPart(pdfBodyPart)

      //construct the mime message
      val mimeMessage = MimeMessage(session)
      mimeMessage.sender = iaSender
      mimeMessage.subject = subject
      mimeMessage.setRecipient(Message.RecipientType.TO, iaRecipient)
      mimeMessage.setContent(mimeMultipart)

      //send off the email
      Transport.send(mimeMessage)
      println(
        "sent from " + sender +
          ", to " + details.email +
          "; server = " + session.properties["mail.smtp.host"]
      )

    } catch (ex: Exception) {
      ex.printStackTrace()
    } finally {
      outputStream.close()
    }
  }

  fun setupEmail(emailConfig: EmailConfiguration): Session {

    val properties = Properties()
    properties["mail.smtp.auth"] = "true"
    properties["mail.smtp.host"] = emailConfig.host
    properties["mail.smtp.starttls.enable"] = true
    properties["mail.smtp.port"] = emailConfig.port

    return Session.getDefaultInstance(properties, object : Authenticator() {
      override fun getPasswordAuthentication(): PasswordAuthentication {
        return PasswordAuthentication(emailConfig.username, emailConfig.password)
      }
    })
  }
}
