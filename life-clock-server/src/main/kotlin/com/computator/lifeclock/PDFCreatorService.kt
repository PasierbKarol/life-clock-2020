package com.computator.lifeclock

import com.itextpdf.text.*
import com.itextpdf.text.pdf.PdfWriter
import java.io.OutputStream

class PDFCreatorService {

  fun createPDFForEmail(goals: List<LifeGoals>, outputStream: OutputStream) {
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
}
