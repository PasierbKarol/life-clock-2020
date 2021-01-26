package com.computator.lifeclock

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.stereotype.Controller;

// NEW ATTEMPT
@Controller
class EmailController {

  @Autowired
  lateinit var emailService: EmailServiceImpl

  val addressee: String = "lefanuproject@gmail.com"

  @PostMapping("/sendSimpleEmail")
  fun sendSimpleEmail(): ResponseEntity<*> {
    try {
      emailService.sendSimpleMessage(addressee, "Simple Email", "Hello! This is simple email")
    } catch (e: Exception) {
      println(e)
      return ResponseEntity<String>("Bad request, email wasn't sent", HttpStatus.BAD_REQUEST)
    }
    return ResponseEntity<String>("Email has been sent", HttpStatus.OK)
  }

}
/*@GetMapping("/sendTemplateEmail")
fun sendTemplateEmail(): ResponseEntity<*> {
  try {
    var params: MutableMap<String, Any> = mutableMapOf()
    params["addresseeName"] = addressee
    params["signatureImage"] = "https://coderlook.com/wp-content/uploads/2019/07/spring-by-pivotal.png"
    emailService.sendSimpleMessageUsingTemplate(addressee, "Template Email", "emailTemplate", params)
  } catch (e: Exception) {
    return ResponseEntity<kotlin.String>("Error while sending message",HttpStatus.BAD_REQUEST)

  }
  return ResponseEntity(ImmutableMultivaluedMap("Email has been sent"), HttpStatus.OK)
}*/

/*@GetMapping("/sendHtmlEmail")
fun sendHtmlEmail(): ResponseEntity<*> {
  try {
    emailService.sendHtmlMessage(addressee, "HTML Email", "<h1>Hello!</h1><p>This is HTML email</p>")
  } catch (e: Exception) {
    return ResponseEntity(kotlin.collections.Map("Error while sending message"),
      HttpStatus.BAD_REQUEST)
  }
  return ResponseEntity(kotlin.collections.Map("Email has been sent"), HttpStatus.OK)
}*/


// todo remove
/*@RestController
class TestController(
  private val emailSenderService: EmailSenderService
) {

  @PostMapping("/api/email")
  fun sendSimpleEmail(
    @RequestBody request: EmailRequest
  ): ResponseEntity {
    emailSenderService.sendEmail(
      subject = request.subject!!,
      targetEmail = request.targetEmail!!,
      text = request.text!!
    )

    return ResponseEntity.noContent().build()
  }

  @PostMapping("/api/email/template")
  fun sendSimpleTemplateEmail(
    @RequestBody request: EmailRequest
  ): ResponseEntity {
    emailSenderService.sendEmailUsingTemplate(
      name = request.name!!,
      targetEmail = request.targetEmail!!
    )

    return ResponseEntity.noContent().build()
  }

  @PostMapping("/api/email/attachment")
  fun sendEmailWithAttachment(
    @RequestBody request: EmailRequest
  ): ResponseEntity {
    emailSenderService.sendEmailWithAttachment(
      targetEmail = request.targetEmail!!
    )

    return ResponseEntity.noContent().build()
  }
}*/

/*@GetMapping(value = ["/sendmail"])
fun sendmail(): String? {
  emailService.sendMail("kate@example.com", "Test Subject", "Test mail")
  return "emailsent"
}*/
