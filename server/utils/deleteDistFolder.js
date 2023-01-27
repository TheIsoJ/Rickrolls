import fs from "fs"

async function main() {
  await fs.rm("./dist", { recursive: true, force: true }, () => {
    console.log("Kansio poistettu.")
  })
}

main()
