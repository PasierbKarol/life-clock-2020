package com.computator.lifeclock

import com.itextpdf.text.*
import com.itextpdf.text.pdf.PdfWriter
import org.springframework.stereotype.Component
import java.io.OutputStream


enum class Sections(val section: String) {
  FIVE_YEARS("Cele na następne 5 lat"),
  TWO_YEARS("Cele na następne 2 lata"),
  ONE_YEAR("Cele na następny rok"),
  SIX_MONTHS("Cele na następne 6 miesięcy"),
  THREE_MONTHS("Cele na następne 3 miesiące"),
  ONE_MONTH("Cele na kolejny miesiąc")
}

@Component
class PDFCreatorService {

  private val content = FontFactory.getFont(FontFactory.HELVETICA, 14F, BaseColor.BLACK)
  private val header: Font = FontFactory.getFont(FontFactory.HELVETICA, 20F, BaseColor.BLACK)
  private val title: Font = FontFactory.getFont(FontFactory.HELVETICA, 28F, BaseColor.DARK_GRAY)

  fun preparePDFForOutput(documentTitle: String, goals: List<LifeGoal>, outputStream: OutputStream) {
    val preparedGoals = goals.groupBy { it.placement }
    val pdfForEmail = Document()

    PdfWriter.getInstance(pdfForEmail, outputStream)
    pdfForEmail.open()
   // -------------- Creating Document --------------------
    createHeader(pdfForEmail, documentTitle, title)

    preparedGoals.forEach {
      println("Creating section: ${it.key}!")
      createParagraph(pdfForEmail, it.key, it.value)
    }
    pdfForEmail.close()

    println("PDF was prepared")
  }

  private fun createParagraph(doc: Document, sectionTitle: String, section: List<LifeGoal>) {
    val paragraph = Paragraph()
    createHeader(doc, sectionTitle, header)

    for (goal in section) {
      paragraph.add(createChunk(goal.name, content))
      paragraph.add(Chunk.NEWLINE)
    }
    paragraph.add(Chunk.NEWLINE)
    doc.add(paragraph)
  }

  private fun createHeader(doc: Document, headerText: String, headerType: Font) {
    val paragraph = Paragraph()
    paragraph.add(createChunk(headerText, headerType))
    paragraph.add(Chunk.NEWLINE)
    doc.add(paragraph)
  }

  private fun createChunk(text: String, fontType: Font): Chunk {
    return Chunk(text, fontType)
  }
}

fun getPDFFileName(name: String): String {
  return "Life-Clock-Goals_$name.pdf"
}
