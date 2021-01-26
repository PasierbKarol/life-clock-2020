package com.computator.lifeclock

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.context.annotation.Bean
import org.springframework.core.env.Environment
import org.springframework.core.io.FileSystemResource
import org.springframework.mail.MailException
import org.springframework.mail.SimpleMailMessage
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.mail.javamail.JavaMailSenderImpl
import org.springframework.mail.javamail.MimeMessageHelper
import org.springframework.stereotype.Component
import java.io.File
import javax.mail.MessagingException


// NEW ATTEMPT
internal interface EmailService {
  fun sendSimpleMessage(to: String,
                        subject: String,
                        text: String)

  fun sendSimpleMessageUsingTemplate(to: String,
                                     subject: String,
                                     template: String,
                                     params: MutableMap<String, Any>)

  fun sendMessageWithAttachment(to: String,
                                subject: String,
                                text: String,
                                pathToAttachment: String)

  fun sendHtmlMessage(to: String,
                      subject: String,
                      htmlMsg: String)
}


@Component
@EnableAutoConfiguration
class EmailServiceImpl : EmailService {

  val sender: String = "info@karolpasierb.pl"

  @Autowired
  lateinit var environment: Environment

  @Bean
  fun mailSender(): JavaMailSenderImpl {
    val javaMailSender = JavaMailSenderImpl()
    javaMailSender.protocol = "SMTP"
    javaMailSender.host = "karolpasierb.atthost24.pl"
    javaMailSender.port = 465
    return javaMailSender
  }

  var emailSender: JavaMailSenderImpl = mailSender()


  override fun sendSimpleMessage(to: String, subject: String, text: String) {
    try {
      val message = SimpleMailMessage()
      message.setTo(to)
      message.setFrom(sender)
      message.setSubject(subject)
      message.setText("Karol is testing email")

      emailSender.send(message)
    } catch (exception: MailException) {
      exception.printStackTrace()
    }

  }

  override fun sendSimpleMessageUsingTemplate(to: String,
                                              subject: String,
                                              template: String,
                                              params: MutableMap<String, Any>) {
    val message = emailSender!!.createMimeMessage()
    val helper = MimeMessageHelper(message, true, "utf-8")
    val html: String = "testing email send"

    helper.setTo(to)
    helper.setFrom(sender)
    helper.setText(html, true)
    helper.setSubject(subject)

    emailSender!!.send(message)
  }

  override fun sendMessageWithAttachment(to: String,
                                         subject: String,
                                         text: String,
                                         pathToAttachment: String) {
    try {
      val message = emailSender!!.createMimeMessage()
      val helper = MimeMessageHelper(message, true)

      helper.setTo(to)
      helper.setFrom(sender)
      helper.setSubject(subject)
      helper.setText(text)

      val file = FileSystemResource(File(pathToAttachment))
      helper.addAttachment("Invoice", file)

      emailSender!!.send(message)
    } catch (e: MessagingException) {
      e.printStackTrace()
    }

  }

  override fun sendHtmlMessage(to: String, subject: String, htmlMsg: String) {
    try {
      val message = emailSender!!.createMimeMessage()
      message.setContent(htmlMsg, "text/html")

      val helper = MimeMessageHelper(message, false, "utf-8")

      helper.setTo(to)
      helper.setFrom(sender)
      helper.setSubject(subject)

      emailSender!!.send(message)
    } catch (exception: MailException) {
      exception.printStackTrace()
    }
  }
}


//todo REMOVE =======================================================

/*@Autowired
private val javaMailSender: JavaMailSender? = null

@Service
class EmailSenderService(
  private val emailSender: JavaMailSender,
  private val template: SimpleMailMessage
) {
  fun sendEmail(
    subject: String,
    text: String,
    targetEmail: String
  ) {
    val message = SimpleMailMessage()

    message.setSubject(subject)
    message.setText(text)
    message.setTo(targetEmail)

    javaMailSender!!.send(message)
  }
}*/
