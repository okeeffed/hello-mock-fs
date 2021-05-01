function main() {
  const [argOne] = process.argv.slice(2);

  if (!argOne) {
    console.log(`CLI arg required`);
    process.exit(1);
  }

  console.log(`arg: ${argOne}`);
}

main();
