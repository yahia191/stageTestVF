import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js";
import { FilesService, File } from "../../files.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  templateUrl: "dashboard.component.html",
})
export class DashboardComponent implements OnInit {
  z = 0;
  t = 0;
  c = 0;
  d = 0;
  doc;

  date = "";

  constructor(
    private filesService: FilesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.date = this.activatedRoute.snapshot.paramMap.get("date");
    /* console.log(this.date); */

    if (!this.date) {
      this.router.navigateByUrl("/404");
    } else {
      this.getTestAutomation();
      this.getCucumber();
    }
  }

  async getTestAutomation() {
    const values = await this.filesService.getTestAutomation(this.date);

    if (values !== null) {
      this.c = values.c;
      this.d = values.d;
      this.doc = values.doc;

      document.getElementById("test1").innerHTML +=
        this.doc.getElementsByClassName("test-status").length + " TEST";
      document.getElementById("test2").innerHTML +=
        "le nombre de test pass " + this.c + "<br>";
      document.getElementById("test3").innerHTML +=
        "le nombre de test fail " + this.d + "<br>";

      new Chart("myChart", {
        type: "doughnut",
        data: {
          labels: ["pass", "fail"],
          datasets: [
            {
              label: "i% des tests",
              data: [this.c, this.d],
              backgroundColor: [
                "rgba(102, 204, 0, 0.2)",
                "rgba(204, 0, 0, 0.2)",
              ],

              borderWidth: 1,
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: "pourcentages des test pass/ fail",
          },
        },
      });
    }
  }

  async getCucumber() {
    const values = await this.filesService.getCucumber(this.date);

    if (values !== null) {
      this.z = values.z;
      this.t = values.t;
      this.doc = values.doc;

      document.getElementById("test11").innerHTML +=
        this.doc.getElementsByTagName("H3").length + " TEST";
      document.getElementById("test12").innerHTML +=
        "le nombre de test pass " + this.z + "<br>";
      document.getElementById("test13").innerHTML +=
        "le nombre de test fail " + this.t + "<br>";

      new Chart("myChart1", {
        type: "doughnut",
        data: {
          labels: ["pass", "fail"],
          datasets: [
            {
              label: "i% des tests",
              data: [this.z, this.t],
              backgroundColor: [
                "rgba(102, 204, 0, 0.2)",
                "rgba(204, 0, 0, 0.2)",
              ],

              borderWidth: 1,
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: "pourcentages des test pass/ fail",
          },
        },
      });
    }
  }
}
