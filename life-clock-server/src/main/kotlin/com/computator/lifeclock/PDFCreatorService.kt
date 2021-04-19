package com.computator.lifeclock

import com.itextpdf.text.*
import com.itextpdf.text.pdf.BaseFont
import com.itextpdf.text.pdf.PdfWriter
import org.springframework.stereotype.Component
import java.io.OutputStream


@Component
class PDFCreatorService {

  val sections = mapOf(
    "FIVE_YEARS" to "Cele na następne 5 lat",
    "TWO_YEARS" to "Cele na następne 2 lata",
    "ONE_YEAR" to "Cele na następny rok",
    "SIX_MONTHS" to "Cele na następne 6 miesięcy",
    "THREE_MONTHS" to "Cele na następne 3 miesiące",
    "ONE_MONTH" to "Cele na kolejny miesiąc")

  private val content = FontFactory.getFont(FontFactory.HELVETICA, BaseFont.CP1250, BaseFont.EMBEDDED, 14F, 0, BaseColor.BLACK)
  private val header: Font = FontFactory.getFont(FontFactory.HELVETICA, BaseFont.CP1250, BaseFont.EMBEDDED, 20F, 0, BaseColor.BLACK)
  private val title: Font = FontFactory.getFont(FontFactory.HELVETICA_BOLD, BaseFont.CP1250, BaseFont.EMBEDDED, 28F, 0, BaseColor.DARK_GRAY)

  fun preparePDFForOutput(goals: List<LifeGoal>, outputStream: OutputStream) {
    val preparedGoals = goals.groupBy { it.placement }
    val pdfForEmail = Document()

    PdfWriter.getInstance(pdfForEmail, outputStream)
    pdfForEmail.open()
    // -------------- Creating Document --------------------
    val documentTitle = "Zegar Życia! \n\n Twoje Cele"
    createHeader(pdfForEmail, documentTitle, title, true)

    preparedGoals.forEach {
      println("Creating section: ${it.key}!")
      createParagraph(pdfForEmail, it.key, it.value)
    }

    pdfForEmail.close()
    println("PDF was prepared")
  }

  private fun createParagraph(doc: Document, sectionTitle: String, section: List<LifeGoal>) {
    val unorderedList = com.itextpdf.text.List(com.itextpdf.text.List.UNORDERED)
    unorderedList.setListSymbol("\u2022")
    unorderedList.indentationLeft = 5F
    unorderedList.postSymbol = " "

    val paragraph = Paragraph()
    paragraph.add(Paragraph(" "))

    createHeader(doc, sections.getOrDefault(sectionTitle.toUpperCase(), sectionTitle), header, false)

    section.forEach { unorderedList.add(ListItem(it.name, content)) }

    doc.add(unorderedList)
    paragraph.add(Chunk.NEWLINE)
    doc.add(paragraph)
  }

  private fun createHeader(doc: Document, headerText: String, headerType: Font, isTitle: Boolean) {
    val paragraph = Paragraph()
    paragraph.add(createChunk(headerText, headerType))
    if (isTitle) paragraph.alignment = Element.ALIGN_CENTER
    paragraph.add(Chunk.NEWLINE)
    paragraph.add(Paragraph(" "))
    doc.add(paragraph)
  }

  private fun createChunk(text: String, fontType: Font): Chunk {
    return Chunk(text, fontType)
  }
}

fun getPDFFileName(name: String): String {
  return "Life-Clock-Goals_$name.pdf"
}
