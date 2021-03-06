import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Proposal } from './proposal';

@Injectable()
export class ProposalService {
  headers: Headers
  options: RequestOptions
  private proposalsUrl = 'http://localhost:3002/proposals';     

	constructor(
    private http: Http
	) {
    this.headers = new Headers({ 'Content-type': 'application/json'});
    this.options = new RequestOptions({ headers: this.headers });
  }

	getProposals(): Observable<Proposal[]> {
		return this.http.get(this.proposalsUrl)
										.map((response: Response) => <Proposal[]>response.json())
										.catch(this.handleError);
  }
  
  getProposal(id: number) {
    return this.http.get(this.proposalsUrl + "/" + id + '.json');
  }

  createProposal(proposal) {
    // let headers = new Headers({ 'Content-type': 'application/json'});
    // let options = new RequestOptions({ headers: headers });
    return this.http.post(this.proposalsUrl, JSON.stringify(proposal), {
      headers: this.headers}).map((res: Response) => res.json());
  }

  deleteProposal(id) {
    return this.http.delete(this.proposalsUrl + "/" + id + '.json', this.options )
               .map(res => res.json());
  }


	private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}