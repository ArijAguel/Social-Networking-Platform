import {Injectable} from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class GeneratePdfService {

  constructor() { }

  downloadPDF(Projecttitle:string,titlePDF:string): void {
    const element = document.getElementById('certificate');
    const excludedElements = document.querySelectorAll('.exclude-from-pdf');
      excludedElements.forEach((el) => {
        (el as HTMLElement).style.display = 'none';
      });
    if (element) {
      const HTML_Width = element.clientWidth || 0;
      const HTML_Height = element.clientHeight || 0;
      const top_left_margin = 15;
      const PDF_Width = HTML_Width + (top_left_margin * 2);
      const PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
      const canvas_image_width = HTML_Width;
      const canvas_image_height = HTML_Height;

      const logoUrl = '../../assets/images/logo/favicon.png';
      const totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
      html2canvas(element, { allowTaint: true }).then(function(canvas) {
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
      const logoWidth = 50;
        const logoHeight = 50;
        const logoMarginBottom = 100;

        pdf.addImage(logoUrl, 'PNG', top_left_margin, top_left_margin, logoWidth, logoHeight);
        pdf.setTextColor(23, 39, 65);

        pdf.setFontSize(30);

      const title: string = Projecttitle;
      const titleWidth = pdf.getStringUnitWidth(title) * 30;
      const titleX = (PDF_Width - titleWidth) / 2;
        pdf.text(title, titleX, top_left_margin + 100);

      pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin + 160, canvas_image_width, canvas_image_height);

      for (let i = 1; i <= totalPDFPages; i++) {
        pdf.addPage();
        pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4) + 130, canvas_image_width, canvas_image_height);
      }

      pdf.save(titlePDF);
        excludedElements.forEach((el) => {
          (el as HTMLElement).style.display = '';
        });
      });
    }
  }

}
