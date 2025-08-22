import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Project} from 'src/app/Models/Projet';
import {ProjectService} from 'src/app/services/project.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent implements OnDestroy {
  projectId!: number;
  project!: Project;
  currentDate!: Date;
  day!: number;
  month!: number;
  year!: number;
  private subscriptions: Subscription = new Subscription();

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private projectService: ProjectService) {
    this.subscriptions.add(
      this.activatedRoute.params.subscribe((params: Params) => {
        this.projectId = params['id'];
        this.subscriptions.add(
          this.projectService.findById(this.projectId).subscribe((data: Project) => {
            this.project = data;
          })
        );
        this.currentDate = new Date();
        this.day = this.currentDate.getDate();
        this.month = this.currentDate.getMonth() + 1;
        this.year = this.currentDate.getFullYear();
      })
    );
  }

  handleDownloadPDF(): void {
    const exportableContent: any = document.getElementById('certificate');

    html2canvas(exportableContent).then((canvas: HTMLCanvasElement) => {
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape');

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(contentDataURL, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('Certificate.pdf');
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
