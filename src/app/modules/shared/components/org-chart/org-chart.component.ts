import { Component, Input, SimpleChanges } from '@angular/core';
import { IEmployee } from '../../interfaces/interfaces';
import { Store } from '@ngrx/store';
import * as d3 from 'd3';
import { OrgChart } from 'd3-org-chart';
import { Router } from '@angular/router';

@Component({
  selector: 'app-org-chart',
  templateUrl: './org-chart.component.html',
  styleUrl: './org-chart.component.css',
})
export class OrgChartComponent {
  @Input() employeeList: IEmployee[] = [];
  allReportees: any[] = [];

  constructor(
    private store: Store<{ employees: IEmployee[] }>,
    private router: Router
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.employeeList) {
      const data = JSON.parse(JSON.stringify(this.employeeList));
      console.log('In Org Data', data);
      this.renderOrgChart(data);
    }
  }

  getAllReportees(parentId: string) {
    this.employeeList.forEach((employee) => {
      if (employee.parentId == parentId) {
        this.allReportees.push(employee);
        this.getAllReportees(employee.id);
      }
    });
  }

  bookmark(parentId: string) {
    console.log('bmcall', parentId);
    const parentData = this.employeeList.filter(
      (emp: IEmployee) => emp.id == parentId
    );

    this.allReportees = [...parentData];
    this.getAllReportees(parentId);

    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/employee-bookmarks', parentId])
    );

    window.open(`${window.location.origin}${url}`, '_blank');
  }

  renderOrgChart(data: any) {
    new OrgChart()
      .container(`.chart-container`)
      .nodeHeight((d) => 85 + 25)
      .nodeWidth((d) => 220 + 2)
      .childrenMargin((d) => 50)
      .compactMarginBetween((d) => 35)
      .compactMarginPair((d) => 30)
      .neighbourMargin((a, b) => 20)
      .onNodeClick((d) => d)
      .nodeContent((d: any, i, arr, state) => {
        const color = '#FFFFFF';
        const imageDiffVert = 25 + 2;

        return `
        <div style='width:${d.width}px;height:${d.height}px;padding-top:${
          imageDiffVert - 2
        }px;padding-left:1px;padding-right:1px'>
                        <div style="font-family: 'Inter', sans-serif;background-color:${color};  margin-left:-1px;width:${
          d.width - 2
        }px;height:${
          d.height - imageDiffVert
        }px;border-radius:10px;border: 1px solid #E4E2E9">
                            <div style="display:flex;justify-content:flex-end;margin-top:5px;margin-right:8px">#${
                              d.data.id
                            } <cds-icon shape="bookmark" id="bookmark${
          d.data.id
        }"></cds-icon></div>
                            <div style="background-color:${color};margin-top:${
          -imageDiffVert - 30
        }px;margin-left:${15}px;border-radius:100px;width:50px;height:50px;" ></div>
                            <div style="margin-top:${
                              -imageDiffVert - 20
                            }px;"> <cds-icon shape="user" badge="info" style="margin-left:${20}px;border-radius:100px;width:40px;height:40px;"></cds-icon></div>
                            <div style="font-size:15px;color:#08011E;margin-left:20px;margin-top:10px">  ${
                              d.data.firstName
                            }  ${d.data.lastName}</div>
                            <div style="color:#716E7B;margin-left:20px;margin-top:3px;font-size:10px;"> ${
                              d.data.designation
                            } </div>
                            <div style="color:#716E7B;margin-left:20px;margin-top:3px;font-size:10px;"> ${
                              d.data.email
                            } </div>
                            <div style="color:#716E7B;margin-left:20px;margin-top:3px;font-size:10px;"> ${
                              d.data.phone
                            } </div>

                        </div>
                    </div>
                            `;
      })
      .data(data)
      .render();

    d3.select(`.chart-container`).on('click', (event) => {
      const empId = event.target?.id;
      if (empId.startsWith('bookmark')) {
        this.bookmark(empId.split('bookmark')[1]);
      }
    });
  }
}
