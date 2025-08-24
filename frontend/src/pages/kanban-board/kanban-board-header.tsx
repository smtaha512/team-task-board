import {
  IonCol,
  IonGrid,
  IonHeader,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

export function KanbanBoardHeader() {
  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>
          <IonGrid>
            <IonRow>
              <IonCol size="10" class="ion-display-flex ion-align-items-center">
                <IonText>Team Task Board</IonText>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonTitle>
      </IonToolbar>
    </IonHeader>
  );
}
