import { Component, OnInit, OnDestroy } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Etape3 } from 'src/app/Models/Etape3/Etape3';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/Models/Projet';

@Component({
  selector: 'app-bmc-view',
  templateUrl: './bmc-view.component.html',
  styleUrls: ['./bmc-view.component.css']
})
export class BmcViewComponent implements OnInit, OnDestroy {
  etape3!: Etape3;
  projectId!: number;
  project!: Project;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private projectService: ProjectService
  ) {
    this.subscriptions.add(
      this.route.params.subscribe((params: Params) => {
        this.etape3 = route.snapshot.data["etape3"];
        this.projectId = params['id'];
      })
    );
  }

  values: any[] = [];

  ngOnInit() {
    this.subscriptions.add(
      this.projectService.findById(this.projectId).subscribe((data: Project) => {
        this.project = data;
      })
    );
  }

  revenir() {
    this.router.navigate(['/feed', 'etape', this.projectId, 3]);
  }

  handleDownloadPDF(): void {
    const exportableContent: any = document.getElementById('exportable-content');

    html2canvas(exportableContent).then((canvas: HTMLCanvasElement) => {
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape');

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(contentDataURL, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('BMC.pdf');
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
