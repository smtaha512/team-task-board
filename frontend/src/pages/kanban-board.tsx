import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { menuOutline } from 'ionicons/icons';

const Columns = {
  TODO: 'Todo',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
} as const;

const columns = Object.values(Columns);

export function KanbanBoard() {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <IonGrid>
              <IonRow>
                <IonCol size="10" class="ion-display-flex ion-align-items-center">
                  <IonText>Team Task Board</IonText>
                </IonCol>
                <IonCol size="2" className="ion-display-flex ion-justify-content-end">
                  <IonButton>Create</IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollX={true}>
        <IonGrid fixed style={{ minWidth: '1140px' }}>
          <IonRow>
            {columns.map((col) => (
              <IonCol key={col}>
                <IonCard>
                  <IonCardHeader>
                    <IonItem>
                      <IonLabel>
                        <IonTitle>{col}</IonTitle>
                      </IonLabel>
                    </IonItem>
                  </IonCardHeader>
                  <IonCardContent style={{ overflowY: 'scroll', height: '80vh' }}>
                    {[...new Array(10)].map((_, idx) => (
                      <IonCard className="ion-margin-vertical" key={idx}>
                        <IonCardHeader>
                          <IonItem>
                            <IonLabel>Badge in end slot</IonLabel>
                          </IonItem>
                        </IonCardHeader>
                        <IonCardContent>
                          <IonText>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi, id impedit cum unde
                            numquam, quod et nisi minus ea veritatis nulla eligendi expedita dignissimos. Accusantium
                            saepe et dicta facere assumenda.
                          </IonText>
                        </IonCardContent>
                        <IonFooter>
                          <IonItem>
                            <IonText color={'tertiary'}>{col}</IonText>
                            <IonIcon slot="end" icon={menuOutline} />
                          </IonItem>
                        </IonFooter>
                      </IonCard>
                    ))}
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </>
  );
}
