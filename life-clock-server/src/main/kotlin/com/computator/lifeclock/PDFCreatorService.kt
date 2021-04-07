package com.computator.lifeclock

import com.itextpdf.text.*
import com.itextpdf.text.pdf.PdfWriter
import org.springframework.stereotype.Component
import java.io.OutputStream

@Component
class PDFCreatorService {

  fun createPDFDocument(goals: List<LifeGoals>, outputStream: OutputStream) {
    val pdfForEmail = Document()
    PdfWriter.getInstance(pdfForEmail, outputStream)
    pdfForEmail.open()
    val font: Font = FontFactory.getFont(FontFactory.HELVETICA, 22F, BaseColor.MAGENTA)
    val paragraph = Paragraph()
    for (goal in goals) {
      paragraph.add(Chunk(goal.name, font))
      paragraph.add((Chunk.NEWLINE))
    }
    paragraph.add(Chunk("hello from karol!", font))
    pdfForEmail.add(paragraph)
    pdfForEmail.close()
  }

  fun preparePDFForOutput(goals: List<LifeGoals>, outputStream: OutputStream) {
    createPDFDocument(goals, outputStream)
    println("PDF was prepared")
  }
}

fun getPDFFileName(name: String): String {
  return "Life-Clock-Goals_$name.pdf"
}
