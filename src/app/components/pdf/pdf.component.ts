import { Component, OnInit, Input, OnChanges } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { trigger, style, transition, animate, state, animation } from '@angular/animations';
@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss'],
  animations: [
    trigger('enterState',[
      state('void',style({
        transform: 'translateX(-100%)',
        opacity: 0
      })),
      transition(':enter',[
        animate(300,style({
          transform: 'translateX(0)',
          opacity: 1
        }))
      ])
    ])
  ]
})
export class PdfComponent implements OnInit, OnChanges {
  @Input('elementoClinicHistory') elemento: HTMLElement;
  constructor() { }
  ngOnInit(): void { }
  seeData() {
    console.log(this.elemento);
  }
  ngOnChanges() {
    console.log(this.elemento);
  }
  downloadPDF() {
    // Extraemos el
    // const DATA = document.getElementById('htmlData');
    const DATA = this.elemento;
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3,
    };

    html2canvas(DATA, options)
      .then((canvas) => {
        const img = canvas.toDataURL('image/PNG');

        // Add image Canvas to PDF
        const bufferX = 15;
        const bufferY = 15;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(
          img,
          'PNG',
          bufferX,
          bufferY,
          pdfWidth,
          pdfHeight,
          undefined,
          'FAST'
        );
        return doc;
      })
      .then((docResult) => {
        var logo = new Image();
        logo.src = 'https://image.ibb.co/n7oTvU/logo_white.png';
        docResult.addImage(logo, 'PNG', 500, 750, 50, 50);
        docResult.text('Clinic History', 40, 800);
        docResult.text(`${new Date().toISOString()}`, 200, 800);
        docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
      });
  }
}
