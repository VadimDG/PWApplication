import { EntitySubscriberInterface, EventSubscriber, UpdateEvent } from 'typeorm';
import { UserEntity } from './../users/user.entity';
import { Logger } from '@nestjs/common';
import { AccountEntity } from 'src/accounts/account.entity';

@EventSubscriber()
export class TransactionSubscriber implements EntitySubscriberInterface<AccountEntity> {

  listenTo(): any {
    return AccountEntity;
  }

  afterUpdate(event: UpdateEvent<AccountEntity>): Promise<any> | void {
      console.log(event);
    // const priceGotUpdated = event.updatedColumns.find(value => value.propertyName, Product.prototype.price);
    // if (priceGotUpdated) {
    //   if (Number(event.databaseEntity.price) !== event.entity.price) {
    //     Logger.log(`Price changed from 
    //     ${ event.databaseEntity.price } to 
    //     ${ event.entity.price }`, 'Product Price Updated');
    //   }
    // }
  }
}