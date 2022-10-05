// 컴포지션(위임)
interface PrinterHeader {
  print(): void;
}

class TSPrinter {
  private printerHeader: PrinterHeader;
  constructor(printerHeader?: PrinterHeader) {
    this.printerHeader = printerHeader || new DefaultPrintHeader();
  }
  print() {
    this.printerHeader.print();
  }
}

class DefaultPrintHeader implements PrinterHeader {
  print() {
    console.log("기본적인 출력!");
  }
}

class TSRedPrinterHeader implements PrinterHeader {
  print() {
    console.log("🔴 출력!");
  }
}

class TSBlackPrinterHeader implements PrinterHeader {
  print() {
    console.log("⚫️ 출력!");
  }
}

const tsPrinters = [
  new TSPrinter(),
  new TSPrinter(new TSRedPrinterHeader()),
  new TSPrinter(new TSBlackPrinterHeader()),
];
printers.forEach((printer) => printer.print());
