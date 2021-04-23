package com.computator.lifeclock

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.io.InputStreamResource
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
  fun sendGoalsByEmail(@RequestBody request: LifeClockRequestBody/*, bindingResult: BindingResult*/): ResponseEntity<*> {
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
  @PostMapping("/export-goals-by-pdf")
//  fun exportGoalsByPDF(@RequestBody request: LifeClockRequestBody/*, bindingResult: BindingResult*/): ResponseEntity<InputStreamResource> {
  fun exportGoalsByPDF(@RequestBody request: LifeClockRequestBody/*, bindingResult: BindingResult*/): ResponseEntity<ByteArray> {
//    if(bindingResult.hasErrors()) {
//    throw ValidationException()
//    }

    val headers = HttpHeaders()
    headers.add("Content-Disposition", "inline; filename=" + getPDFFileName(request.personalDetails.name))

    val outputStream = ByteArrayOutputStream()
    lateinit var bis: InputStream

    try {
//      emailService.sendMessageWithAttachment(addressee, "Simple Email from Kotlin", emailRequest, "")
      pdfService.preparePDFForOutput(request.goals, outputStream)
      val bytes: ByteArray = outputStream.toByteArray()
      bis = bytes.inputStream()
    } catch (e: Exception) {
      println(e)
    } finally {
      outputStream.close()
    }
//    return ResponseEntity
//      .ok()
//      .headers(headers)
//      .contentType(MediaType.APPLICATION_PDF)
//      .body(InputStreamResource(bis))
        return ResponseEntity
      .ok()
      .headers(headers)
      .contentType(MediaType.APPLICATION_PDF)
      .body(bis.readAllBytes())
  }
}

