export interface Tproduct {
  _id?: string;
  englishName: string;
  banglaName: string;
  buyingPrice: string; // Represented as a string based on your payload ("8")
  sellingPrice: string; // Represented as a string based on your payload ("10")
  image: string;
  barCode?: number;
  stock: number | null;
  expiredDate?: string | Date | null; // Optional/nullable based on incomplete key
 
}