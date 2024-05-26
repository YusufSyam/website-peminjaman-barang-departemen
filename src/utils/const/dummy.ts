// import dummy1 from "../../assets/images/dummy1.png";
// import dummy2 from "../../assets/images/dummy2.jpeg";
// import dummy3 from "../../assets/images/dummy3.jpeg";
// import dummy4 from "../../assets/images/dummy4.png";
// import dummy5 from "../../assets/images/dummy5.jpg";
// import dummy6 from "../../assets/images/dummy6.jpg";
// import dummy7 from "../../assets/images/dummy7.jpg";
// import { IBorrowActivity } from "../../pages/activity/Activity.page";
// import { ICatalogItem } from "../../pages/home/Catalog/CatalogItem.component";

// export const dummyCatalogList: Array<ICatalogItem> = [
//   {
//     label: "Proyektor",
//     stock: 10,
//     borrowed: 5,
//     image: dummy1
//   },
//   {
//     label: "Laptop",
//     stock: 2,
//     borrowed: 2,
//     image: dummy2
//   },
//   {
//     label: "Kamera",
//     stock: 12,
//     borrowed: 7,
//     image: dummy3
//   },
//   {
//     label: "Speaker",
//     stock: 5,
//     borrowed: 5,
//     image: dummy4
//   },
//   {
//     label: "Mikrofon",
//     stock: 7,
//     borrowed: 7,
//     image: dummy5
//   },
//   {
//     label: "Monitor",
//     stock: 15,
//     borrowed: 2,
//     image: dummy6
//   },
//   {
//     label: "Mouse",
//     stock: 6,
//     borrowed: 2,
//     image: dummy7
//   },
//   {
//     label: "Keyboard",
//     stock: 8,
//     borrowed: 0,
//     image: dummy1
//   },
//   {
//     label: "Webcam",
//     stock: 10,
//     borrowed: 5,
//     image: dummy2
//   },
//   {
//     label: "Tripod",
//     stock: 9,
//     borrowed: 9,
//     image: dummy3
//   },
//   {
//     label: "Papan Tulis",
//     stock: 4,
//     borrowed: 2,
//     image: dummy4
//   },
//   {
//     label: "Scanner",
//     stock: 6,
//     borrowed: 6,
//     image: dummy5
//   },
//   {
//     label: "Hard Disk Eksternal",
//     stock: 12,
//     borrowed: 6,
//     image: dummy6
//   },
//   {
//     label: "Printer",
//     stock: 8,
//     borrowed: 3,
//     image: dummy7
//   },
//   {
//     label: "Layar Proyektor",
//     stock: 5,
//     borrowed: 5,
//     image: dummy1
//   },
//   {
//     label: "Charger Laptop",
//     stock: 10,
//     borrowed: 10,
//     image: dummy2
//   },
//   {
//     label: "Tas Laptop",
//     stock: 7,
//     borrowed: 0,
//     image: dummy3
//   },
//   {
//     label: "Alat Presentasi",
//     stock: 9,
//     borrowed: 0,
//     image: dummy4
//   },
//   {
//     label: "Baterai Cadangan",
//     stock: 15,
//     borrowed: 2,
//     image: dummy5
//   },
//   {
//     label: "Lampu Ruangan",
//     stock: 6,
//     borrowed: 3,
//     image: dummy6
//   },
//   {
//     label: "Papan Presentasi",
//     stock: 8,
//     borrowed: 2,
//     image: dummy7
//   },
//   {
//     label: "Adaptor Listrik",
//     stock: 10,
//     borrowed: 9,
//     image: dummy1
//   },
//   {
//     label: "Kabel HDMI",
//     stock: 12,
//     borrowed: 12,
//     image: dummy2
//   },
//   {
//     label: "Kabel VGA",
//     stock: 5,
//     borrowed: 2,
//     image: dummy3
//   },
//   {
//     label: "Kabel USB",
//     stock: 6,
//     borrowed: 3,
//     image: dummy4
//   },
//   {
//     label: "Kursi Belajar",
//     stock: 14,
//     borrowed: 7,
//     image: dummy5
//   },
//   {
//     label: "Meja Belajar",
//     stock: 8,
//     borrowed: 4,
//     image: dummy6
//   },
//   {
//     label: "Lampu Meja",
//     stock: 10,
//     borrowed: 0,
//     image: dummy7
//   },
//   {
//     label: "Kursi Roda",
//     stock: 5,
//     borrowed: 5,
//     image: dummy1
//   },
//   {
//     label: "Sarung Tangan",
//     stock: 10,
//     borrowed: 5,
//     image: dummy2
//   },
//   {
//     label: "Senter",
//     stock: 7,
//     borrowed: 7,
//     image: dummy3
//   }
// ];


// export const dummyBorrowActivities: Array<IBorrowActivity> = [
//   {
//     id: 1,
//     itemName: "Proyektor",
//     itemImage: dummy1,
//     borrower: "John Doe",
//     activityType: "borrow",
//     borrowDate: new Date("2024-05-10"),
//     borrowTime: 9,
//     supposedReturnDate: new Date("2024-05-10"),
//     supposedReturnTime: 12,
//     actualReturnDate: new Date("2024-05-10"),
//     actualReturnTime: 11,
//     additionalInformation: "Untuk presentasi kelas"
//   },
//   {
//     id: 2,
//     itemName: "Laptop",
//     itemImage: dummy2,
//     borrower: "Jane Smith",
//     activityType: "return",
//     borrowDate: new Date("2024-05-11"),
//     borrowTime: 10,
//     supposedReturnDate: new Date("2024-05-11"),
//     supposedReturnTime: 15,
//     actualReturnDate: new Date("2024-05-11"),
//     actualReturnTime: 14,
//     additionalInformation: "Untuk mengerjakan tugas akhir"
//   },
//   {
//     id: 3,
//     itemName: "Kamera",
//     itemImage: dummy3,
//     borrower: "Alice Johnson",
//     activityType: "borrow",
//     borrowDate: new Date("2024-05-12"),
//     borrowTime: 13,
//     supposedReturnDate: new Date("2024-05-13"),
//     supposedReturnTime: 10,
//     actualReturnDate: new Date("2024-05-13"),
//     actualReturnTime: 9,
//     additionalInformation: "Untuk proyek fotografi"
//   },
//   {
//     id: 4,
//     itemName: "Speaker",
//     itemImage: dummy4,
//     borrower: "Bob Brown",
//     activityType: "return",
//     borrowDate: new Date("2024-05-13"),
//     borrowTime: 14,
//     supposedReturnDate: new Date("2024-05-14"),
//     supposedReturnTime: 17,
//     actualReturnDate: new Date("2024-05-14"),
//     actualReturnTime: 16,
//     additionalInformation: "Untuk acara seminar"
//   },
//   {
//     id: 5,
//     itemName: "Mikrofon",
//     itemImage: dummy5,
//     borrower: "Ella Garcia",
//     activityType: "borrow",
//     borrowDate: new Date("2024-05-14"),
//     borrowTime: 11,
//     supposedReturnDate: new Date("2024-05-15"),
//     supposedReturnTime: 14,
//     actualReturnDate: new Date("2024-05-15"),
//     actualReturnTime: 13,
//     additionalInformation: "Untuk kegiatan musik di kampus"
//   },
//   {
//     id: 6,
//     itemName: "Monitor",
//     itemImage: dummy6,
//     borrower: "David Wilson",
//     activityType: "return",
//     borrowDate: new Date("2024-05-15"),
//     borrowTime: 10,
//     supposedReturnDate: new Date("2024-05-15"),
//     supposedReturnTime: 15,
//     actualReturnDate: new Date("2024-05-15"),
//     actualReturnTime: 14,
//     additionalInformation: "Untuk presentasi proyek"
//   },
//   {
//     id: 7,
//     itemName: "Mouse",
//     itemImage: dummy7,
//     borrower: "Grace Lee",
//     activityType: "borrow",
//     borrowDate: new Date("2024-05-17"),
//     borrowTime: 12,
//     supposedReturnDate: new Date("2024-05-17"),
//     supposedReturnTime: 17,
//     actualReturnDate: new Date("2024-05-17"),
//     actualReturnTime: 16,
//     additionalInformation: "Untuk mengerjakan tugas"
//   },
//   {
//     id: 8,
//     itemName: "Keyboard",
//     itemImage: dummy1,
//     borrower: "Michael Clark",
//     activityType: "borrow",
//     borrowDate: new Date("2024-05-17"),
//     borrowTime: 9,
//     supposedReturnDate: new Date("2024-05-17"),
//     supposedReturnTime: 12,
//     actualReturnDate: new Date("2024-05-17"),
//     actualReturnTime: 11,
//     additionalInformation: "Untuk presentasi dalam seminar"
//   },
//   {
//     id: 9,
//     itemName: "Webcam",
//     itemImage: dummy2,
//     borrower: "Olivia Martinez",
//     activityType: "return",
//     borrowDate: new Date("2024-05-18"),
//     borrowTime: 14,
//     supposedReturnDate: new Date("2024-05-19"),
//     supposedReturnTime: 10,
//     actualReturnDate: new Date("2024-05-19"),
//     actualReturnTime: 9,
//     additionalInformation: "Untuk rapat online"
//   },
//   {
//     id: 10,
//     itemName: "Tripod",
//     itemImage: dummy3,
//     borrower: "Sophia Rodriguez",
//     activityType: "borrow",
//     borrowDate: new Date("2024-05-19"),
//     borrowTime: 10,
//     supposedReturnDate: new Date("2024-05-20"),
//     supposedReturnTime: 15,
//     actualReturnDate: new Date("2024-05-20"),
//     actualReturnTime: 14,
//     additionalInformation: "Untuk kegiatan fotografi"
//   }
// ];
