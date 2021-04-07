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
  @PostMapping("/send-goals-by-email")
  fun sendGoalsByEmail(@RequestBody request: ExportToEmailRequest/*, bindingResult: BindingResult*/): ResponseEntity<*> {
//    if(bindingResult.hasErrors()) {
//    throw ValidationException()
//    }

    try {
//      emailService.sendMessageWithAttachment(addressee, "Simple Email from Kotlin", emailRequest, "")
      emailService.sendPDFByEmail(request.personalDetails, request.goals)
    } catch (e: Exception) {
      println(e)
      return ResponseEntity<String>("Bad request, email wasn't sent", HttpStatus.BAD_REQUEST)
    }
    return ResponseEntity<String>("Email has been sent", HttpStatus.OK)
  }

  @CrossOrigin(origins = ["http://localhost:4200"])
  @PostMapping("export-goals-by-pdf")
  fun exportGoalsByPDF(@RequestBody request: ExportToEmailRequest/*, bindingResult: BindingResult*/): ResponseEntity<*> {
//    if(bindingResult.hasErrors()) {
//    throw ValidationException()
//    }

    try {
//      emailService.sendMessageWithAttachment(addressee, "Simple Email from Kotlin", emailRequest, "")
    } catch (e: Exception) {
      println(e)
      return ResponseEntity<String>("Bad request, email wasn't sent", HttpStatus.BAD_REQUEST)
    }
    return ResponseEntity<String>("Email has been sent", HttpStatus.OK)
  }

}

