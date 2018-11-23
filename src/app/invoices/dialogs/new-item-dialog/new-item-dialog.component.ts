import { Component, OnInit, Inject } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import InvoiceItem from '@app/interfaces/invoiceItem.interface';

@Component({
	selector: 'app-new-item-dialog',
	templateUrl: './new-item-dialog.component.html',
	styleUrls: ['./new-item-dialog.component.scss']
})

export class NewItemDialogComponent implements OnInit {

	newItemForm: FormGroup;

	item: InvoiceItem;
	items: InvoiceItem[];

	itemTypes: String[];

	taxCodes: Array<{}>;

	constructor(private dialogRef: MatDialogRef<NewItemDialogComponent>, @Inject (MAT_DIALOG_DATA) private data, private formBuilder: FormBuilder) {
		this.items = this.data.items;

		this.newItemForm = this.formBuilder.group({
			number: [this.items.length + 1],
			description: new FormControl('', [Validators.required]),
			type: new FormControl('', [Validators.required]),
			quantity: new FormControl('', [Validators.required]),
			unitPrice: new FormControl('', [
				Validators.required
			]),
			taxCode: new FormControl('', [Validators.required]),
			notes: new FormControl('', [])
		})

		this.itemTypes = [
			'product',
			'service',
			'hour',
			'week',
			'discount',
			'deduction'
		]

		this.taxCodes = [
			{
				name: 'None',
				rate: 0
			},
			{
				name: 'Reduced (5%)',
				rate: 5
			},
			{
				name: 'Standard (20%)',
				rate: 20
			}
		]
	}

	ngOnInit() {
		
	}

	addItem() {
		this.item = this.newItemForm.value;

		this.item.subtotal = this.item.quantity * this.item.unitPrice;
		this.item.tax = this.item.subtotal * (this.item.taxCode / 100);
		this.item.total = this.item.subtotal + this.item.tax;

		this.dialogRef.close(this.item);
	}

}
