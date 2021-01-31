package com.computator.lifeclock

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.PropertySource
import org.springframework.core.io.FileSystemResource
import org.springframework.mail.MailException
import org.springframework.mail.SimpleMailMessage
import org.springframework.mail.javamail.JavaMailSenderImpl
import org.springframework.mail.javamail.MimeMessageHelper
import org.springframework.stereotype.Component
import java.io.File
import javax.mail.MessagingException

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
  fun sendMessageWithAttachment(to: String,
                                subject: String,
                                text: String,
                                pathToAttachment: String)

  fun sendHtmlMessage(to: String,
                      subject: String,
                      htmlMsg: String)
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


  override fun sendMessageWithAttachment(to: String,
                                         subject: String,
                                         text: String,
                                         pathToAttachment: String) {
    try {
      val message = emailSender.createMimeMessage()
      val helper = MimeMessageHelper(message, true)

      helper.setTo(to)
      helper.setFrom(sender)
      helper.setSubject(subject)
      helper.setText(text)

      val file = FileSystemResource(File(pathToAttachment))
      helper.addAttachment("Invoice", file)

      emailSender.send(message)
    } catch (e: MessagingException) {
      e.printStackTrace()
    }

  }

  override fun sendHtmlMessage(to: String, subject: String, htmlMsg: String) {
    try {
      val message = emailSender.createMimeMessage()
      message.setContent(htmlMsg, "text/html")

      val helper = MimeMessageHelper(message, false, "utf-8")

      helper.setTo(to)
      helper.setFrom(sender)
      helper.setSubject(subject)

      emailSender.send(message)
    } catch (exception: MailException) {
      exception.printStackTrace()
    }
  }
}
