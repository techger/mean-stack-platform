import InvoiceItem from './invoiceItem.interface';

export default interface Invoice {
    id: string,
    reference: string,
    date: string,
    dueDate: string,
    saleDate: string,
    contactId: string,
    items: InvoiceItem[],
    notes: string,
    subtotal: number,
    taxCode: number,
    tax: number,
    total: number,
    outstanding: number,
    status: string,
}