package com.computator.lifeclock

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import java.io.ByteArrayOutputStream
import java.io.InputStream

@RestController
class LifeCLockController {

  @Autowired
  lateinit var emailService: EmailService

  @Autowired
  lateinit var pdfService: PDFCreatorService


  @CrossOrigin(origins = ["http://localhost:4200"])
  @PostMapping("/send-goals-by-email")
  fun sendGoalsByEmail(@RequestBody request: LifeClockRequestBody/*, bindingResult: BindingResult*/): ResponseEntity<ResponseModel> {
//    if(bindingResult.hasErrors()) {
//    throw ValidationException()
//    }

    val headers = HttpHeaders()
    headers.add("Content-Disposition", "inline;")

    try {
//      emailService.sendMessageWithAttachment(addressee, "Simple Email from Kotlin", emailRequest, "")
      emailService.sendPDFByEmail(request.personalDetails, request.goals)
    } catch (e: Exception) {
      println(e)
      return ResponseEntity
        .badRequest()
        .headers(headers)
        .contentType(MediaType.APPLICATION_PROBLEM_JSON)
        .body(ResponseModel(null, null, "Bad request, email wasn't sent", HttpStatus.BAD_REQUEST))
    }
    return ResponseEntity
      .ok()
      .headers(headers)
      .contentType(MediaType.APPLICATION_JSON)
      .body(ResponseModel("The email was sent successfully!", null, "", HttpStatus.OK))
  }

  @CrossOrigin(origins = ["http://localhost:4200"])
  @PostMapping("/export-goals-by-pdf")
  fun exportGoalsByPDF(@RequestBody request: List<LifeGoal>/*, bindingResult: BindingResult*/): ResponseEntity<*> {
//    if(bindingResult.hasErrors()) {
//    throw ValidationException()
//    }

    val headers = HttpHeaders()
    headers.add("Content-Disposition", "inline; filename=" + getPDFFileName(""))

    val outputStream = ByteArrayOutputStream()
    lateinit var bis: InputStream

    try {
      pdfService.preparePDFForOutput(request, outputStream)
      val bytes: ByteArray = outputStream.toByteArray()
      bis = bytes.inputStream()
    } catch (e: Exception) {
      println(e)
      return ResponseEntity
        .badRequest()
        .headers(headers)
        .contentType(MediaType.APPLICATION_PROBLEM_JSON)
        .body(ResponseModel(null, null, "Bad request, PDF wasn't created!", HttpStatus.BAD_REQUEST))
    } finally {
      outputStream.close()
    }

    return ResponseEntity
      .ok()
      .headers(headers)
      .contentType(MediaType.APPLICATION_PDF)
      .body(bis.readAllBytes())
  }
}

