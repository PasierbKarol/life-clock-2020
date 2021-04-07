package com.computator.lifeclock

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class EmailController {

  @Autowired
  lateinit var emailService: EmailService


  @CrossOrigin(origins = ["http://localhost:4200"])
//@CrossOrigin(origins = ["http://localhost:8080"])
  @PostMapping("/export-goals-email")
  fun sendSimpleEmail(@RequestBody emailRequest: ExportToEmailRequest/*, bindingResult: BindingResult*/): ResponseEntity<*> {
//    if(bindingResult.hasErrors()) {
//    throw ValidationException()
//    }

    try {
//      emailService.sendMessageWithAttachment(addressee, "Simple Email from Kotlin", emailRequest, "")
      emailService.sendPDFByEmail("Simple Email from Kotlin", emailRequest)
    } catch (e: Exception) {
      println(e)
      return ResponseEntity<String>("Bad request, email wasn't sent", HttpStatus.BAD_REQUEST)
    }
    return ResponseEntity<String>("Email has been sent", HttpStatus.OK)
  }

}

