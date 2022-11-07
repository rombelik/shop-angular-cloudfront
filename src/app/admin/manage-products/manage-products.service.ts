import { Injectable, Injector } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { ApiService } from '../../core/api.service';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class ManageProductsService extends ApiService {
  constructor(injector: Injector) {
    super(injector);
  }

  uploadProductsCSV(file: File): Observable<unknown> {
    if (!this.endpointEnabled('import')) {
      console.warn(
        'Endpoint "import" is disabled. To enable change your environment.ts config'
      );
      return EMPTY;
    }

    return this.getPreSignedUrl(file.name).pipe(
      switchMap((url) =>
        this.http.put(url, file, {
          headers: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'text/csv',
          },
        })
      )
    );
  }

  private getPreSignedUrl(fileName: string): Observable<string> {
    const url = this.getUrl('import', 'import');
    const authorizationToken = localStorage.getItem("authorization_token");
    console.log('authorizationToken', authorizationToken)
    let header
    if (authorizationToken === null) {
      header = {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'text/csv',
      }
    } else {
      header = {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'text/csv',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: `Basic ${authorizationToken}`
      }
    }
    return this.http.get<string>(url, {
      params: {
        name: fileName,
      },
      headers: header,
    });
  }
}
