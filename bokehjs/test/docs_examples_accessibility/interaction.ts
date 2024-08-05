import {test, expect} from "@playwright/test"
import AxeBuilder from "@axe-core/playwright"
import {exec} from "child_process"
import path from "path"

const pages_to_test = [
  "http://localhost:5009/en/latest/docs/examples/interaction/tools/range_tool.html",
  "http://localhost:5009/en/latest/docs/examples/interaction/widgets/dropdown.html",
  "http://localhost:5009/en/latest/docs/examples/interaction/linking/linked_brushing.html",
  "http://localhost:5009/en/latest/docs/examples/interaction/linking/linked_crosshair.html",
  "http://localhost:5009/en/latest/docs/examples/interaction/linking/data_table_plot.html",
  "http://localhost:5009/en/latest/docs/examples/interaction/legends/legend_hide.html",
  "http://localhost:5009/en/latest/docs/examples/interaction/legends/legend_mute.html",
  "http://localhost:5009/en/latest/docs/examples/interaction/js_callbacks/slider.html",
  "http://localhost:5009/en/latest/docs/examples/interaction/js_callbacks/color_sliders.html",
  "http://localhost:5009/en/latest/docs/examples/interaction/js_callbacks/customjs_lasso_mean.html",
  "http://localhost:5009/en/latest/docs/examples/interaction/js_callbacks/js_on_event.html",
  "http://localhost:5009/en/latest/docs/examples/interaction/widgets/multiselect.html",
  "http://localhost:5009/en/latest/docs/examples/interaction/widgets/multichoice.html",
  "http://localhost:5009/en/latest/docs/examples/interaction/widgets/date_picker.html",
  "http://localhost:5009/en/latest/docs/examples/interaction/widgets/dropdown.html",
  "http://localhost:5009/en/latest/docs/examples/interaction/widgets/data_table.html",
  "http://localhost:5009/en/latest/docs/examples/interaction/widgets/data_cube.html",
]

const scriptDir = __dirname
const docsDir = path.join(scriptDir, "../../docs/bokeh")

function startDocsServer() {
  exec("make serve", {cwd: docsDir})
  return new Promise(resolve => setTimeout(resolve, 5000))
}

function stopDocsServer() {
  console.log("Stopping the docs server...")
  exec("kill $(lsof -t -i:5009)")
}

// Hook to run before all tests
test.beforeAll(async () => {
  await startDocsServer()
})

// Hook to run after all tests
test.afterAll(() => {
  stopDocsServer()
})

for (const url of pages_to_test) {
  test.describe("tests for interactions gallery", () => { // 2
    test(`${url} should not have any automatically detectable accessibility issues`, async ({page}) => {
      await page.goto(url)

      const accessibilityScanResults = await new AxeBuilder({page}).analyze()

      expect(accessibilityScanResults.violations).not.toEqual([])
    })
  })
}
