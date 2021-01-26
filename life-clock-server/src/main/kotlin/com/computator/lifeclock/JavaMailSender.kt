package com.computator.lifeclock

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.context.properties.ConstructorBinding
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.mail.javamail.JavaMailSenderImpl
import java.util.*

// https://codersee.com/how-to-send-emails-with-spring-boot-and-kotlin/
/*
@ConstructorBinding
@ConfigurationProperties(prefix = "mail-sender")
class MailSenderProperties(
  val host: String,
  val port: Int,
  val username: String,
  val password: String,
  val protocol: String,
  val auth: Boolean,
  val starttlsEnable: Boolean,
  val debug: Boolean
)

@Configuration
@EnableConfigurationProperties(MailSenderProperties::class)
class MailSenderConfig(
  public val mailSenderProperties: MailSenderProperties
)


@Bean
fun getJavaMailSender(): JavaMailSender {
  val mailSender = JavaMailSenderImpl()
  mailSender.host = "smtp.gmail.com"
  mailSender.port = 587
  mailSender.username = "my.gmail@gmail.com"
  mailSender.password = "password"
//  val props: Properties = mailSender.javaMailProperties
  configureJavaMailProperties(mailSender.javaMailProperties)

  props.put("mail.transport.protocol", "smtp")
  props.put("mail.smtp.auth", "true")
  props.put("mail.smtp.starttls.enable", "true")
  props.put("mail.debug", "true")
  return mailSender
}

private fun configureJavaMailProperties(properties: Properties) {
//  val mailSenderProperties = MailSenderConfig.mailSenderProperties
  properties["mail.transport.protocol"] = MailSenderConfig.mailSenderProperties.protocol
  properties["mail.smtp.auth"] = mailSenderProperties.auth
  properties["mail.smtp.starttls.enable"] = mailSenderProperties.starttlsEnable
  properties["mail.debug"] = mailSenderProperties.debug
}*/
