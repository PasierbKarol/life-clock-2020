package com.computator.lifeclock

import com.itextpdf.text.*
import com.itextpdf.text.pdf.PdfWriter
import java.io.ByteArrayInputStream
import java.io.ByteArrayOutputStream
import java.io.FileOutputStream
import java.io.OutputStream
import java.lang.Exception
import javax.xml.parsers.DocumentBuilderFactory

class PDFCreatorService {

  fun createPDFForEmail(content: ExportToEmailRequest, outputStream: OutputStream) {
    val pdfForEmail = Document()
    PdfWriter.getInstance(pdfForEmail, outputStream)
    pdfForEmail.open()
    val font: Font = FontFactory.getFont(FontFactory.HELVETICA, 22F, BaseColor.MAGENTA)
    val paragraph = Paragraph()
    for (goal in content.goals) {
      paragraph.add(Chunk(goal.name, font))
      paragraph.add((Chunk.NEWLINE))
    }
    paragraph.add(Chunk("hello from karol!", font))
    pdfForEmail.add(paragraph)
    pdfForEmail.close()
  }
}
