import {Component, OnInit, ViewChild} from '@angular/core';
import {Product, ProductPhoto} from "../../../../model";
import {ProductPhotoHttpService} from "../../../../services/http/product-photo-http.service";
import {ActivatedRoute} from "@angular/router";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {ProductPhotoEditModalComponent} from "../product-photo-edit-modal/product-photo-edit-modal.component";

declare const $;

@Component({
  selector: 'app-product-photo-manager',
  templateUrl: './product-photo-manager.component.html',
  styleUrls: ['./product-photo-manager.component.scss']
})
export class ProductPhotoManagerComponent implements OnInit {

  photos: ProductPhoto[] = [];
  productId: number = null;
  product: Product = null;
  photoIdToEdit:number = null;

  @ViewChild(ProductPhotoEditModalComponent) editModal: ProductPhotoEditModalComponent;

  constructor(private productPhotoHttp: ProductPhotoHttpService, private route: ActivatedRoute, private notifyMessage: NotifyMessageService) { }

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.productId = param.productId;
      this.getPhotos();
    });

    this.configFancyBox();
  }

  getPhotos(){
    this.productPhotoHttp.list(this.productId)
        .subscribe((data) => {
          this.product = data.product;
          this.photos = data.photos;
        });
  }

  configFancyBox(){
    $.fancybox.defaults.btnTpl.edit = `
      <a class="fancybox-button" data-fancybox-edit title="Substituir a imagem" href="javascript:void(0)" style="text-align: center">
        <i class="fas fa-edit"></i>
      </a>
    `;

    $.fancybox.defaults.btnTpl.delete = `
      <a class="fancybox-button" data-fancybox-delete title="Excluir a imagem" href="javascript:void(0)" style="text-align: center">
        <i class="fas fa-trash"></i>
      </a>
    `;
    $.fancybox.defaults.buttons = ['download','edit','delete','thumbs'];

    $('body').on('click','[data-fancybox-edit]', (e) => {
      this.editModal.showModal();
      this.photoIdToEdit = this.getImageIdFromSlideShow();
    });

    $('body').on('click','[data-fancybox-delete]', (e) => {
      const remove = confirm('Deseja realmente excluir essa imagem?');
      const idToDelete = this.getImageIdFromSlideShow();
      if(remove){
        this.productPhotoHttp.destroy(this.productId, idToDelete)
            .subscribe(()=>{
              this.onDeleteSuccess(idToDelete);
            })
      }
    });
  }

  getImageIdFromSlideShow(){
    const src = $('.fancybox-slide--current .fancybox-image').attr('src');

    const photoId = $('[data-fancybox="gallery"]').find(`[src="${src}"]`).attr('id');

    return photoId.split('-')[1];
  }

  onInsertSuccess(data: {photos:ProductPhoto[]}){
    this.photos.push(...data.photos);
    this.notifyMessage.success('Foto(s) cadastrada(s) com sucesso')
  }

  onEditSuccess(data: ProductPhoto){
    $.fancybox.getInstance().close();
    this.editModal.hideModal();

    const index = this.photos.findIndex((photo) => {
      return photo.id == this.photoIdToEdit;
    });

    this.photos[index] = data;

    this.notifyMessage.success('Foto alterada com sucesso!');
  }

  onDeleteSuccess(photoIdDeleted){

    $.fancybox.getInstance().close();
    this.editModal.hideModal();

    const index = this.photos.findIndex((photo) => {
      return photo.id == photoIdDeleted;
    });

    this.photos.splice(index,1);

    this.notifyMessage.success('Foto removida com sucesso!');
  }
}
