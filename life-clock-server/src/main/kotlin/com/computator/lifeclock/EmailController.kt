package com.computator.lifeclock

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import javax.validation.ValidationException

@RestController
class EmailController {

  @Autowired
  lateinit var emailService: EmailServiceImpl

  val addressee: String = "pasierbkarol@gmail.com"

  @PostMapping("/sendSimpleEmail")
  fun sendSimpleEmail(@RequestBody goals: LifeClockGoals, bindingResult: BindingResult): ResponseEntity<*> {
    if(bindingResult.hasErrors()) {
    throw ValidationException()
    }

    try {
      emailService.sendMessageWithAttachment(addressee, "Simple Email from Kotlin", "Hello! This is simple email", "")
    } catch (e: Exception) {
      println(e)
      return ResponseEntity<String>("Bad request, email wasn't sent", HttpStatus.BAD_REQUEST)
    }
    return ResponseEntity<String>("Email has been sent", HttpStatus.OK)
  }

}

