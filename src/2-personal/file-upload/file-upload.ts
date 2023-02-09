import { Output, EventEmitter, Injectable } from "@angular/core";
import { Headers, Http, Response, RequestOptionsArgs, RequestOptions, URLSearchParams, RequestMethod, ResponseContentType } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";
import { FileUploader, FileUploaderOptions, FileItem, ParsedResponseHeaders } from "ng2-file-upload";
import { EIMMessageService, EIMMessageType } from "./message.service";
import { EIMSessionTimeoutService } from "./session-timeout.service";
import { EIMServerConfigService } from "./server-config.service";
import { environment } from "../../../environments/environment";
import { EIMJSONService } from "./json.service";
import { TranslateService } from "@ngx-translate/core";
/**/
/**
 *
 * HTTPサービスです。<br/>
 * @class EIMHttpService
 * @module EIMSharedModule
 */
@Injectable()
export class EIMHttpService {
  /** 行選択イベントエミッタ */
  @Output()
  public started: EventEmitter<any[]> = new EventEmitter<any[]>();
  /** 行選択イベントエミッタ */
  @Output()
  public ended: EventEmitter<any[]> = new EventEmitter<any[]>();
  // アクセス中のリクエスト数
  private count = 0;
  // アクセス中のリクエスト数(プログレスバー表示問い合わせ除く)
  private countWithoutNonDisplayProgress = 0;
  constructor(
    private http: Http,
    private messageService: EIMMessageService,
    private sessionTimeoutService: EIMSessionTimeoutService,
    private serverConfigService: EIMServerConfigService,
    private translateService: TranslateService,
    private jsonService: EIMJSONService
  ) {}
  /**
   * HTTP POSTサービスを呼び出します.
   *
   * @param {string} url URL
   * @param {any} [params] パラメータ
   * @return {Observable<any>} オブザーバ
   */
  public post(url: string, params?: any, displayProgressDialog: boolean = true, displayErrorDialog: boolean = true): Observable<any> {
    const headers = new Headers({ "Content-Type": "application/json" });
    const options = new RequestOptions({
      headers: headers,
      withCredentials: true,
    });
    const body = JSON.stringify(params);
    this.beginRequest(displayProgressDialog);
    return this.http
      .post(this.serverConfigService.getContextPath() + url, body, options)
      .map((res) => {
        this.endRequest(displayProgressDialog);
        let json: any = this.convertJSON(res, url);
        // エラーチェック
        if (json.error) {
          if (this.sessionTimeoutService.checkSessionTimeout(this.getErrorMessage(json))) {
            this.sessionTimeoutService.doSessionTimeout(this.getErrorMessage(json));
          } else {
            if (displayErrorDialog) {
              this.messageService.show(EIMMessageType.error, this.getErrorMessage(json));
            }
          }
          let error = new Error(this.getErrorMessage(json));
          error["url"] = url;
          error["params"] = params;
          error["message"] = this.getErrorMessage(json);
          throw error;
        }
        return Observable.of(json);
      })
      .catch((error: any) => {
        if (error["url"]) {
          throw error;
        } else {
          this.endRequest(displayProgressDialog);
          let message: string = this.translateService.instant("EIM.ERROR_0001");
          if (displayErrorDialog) {
            this.messageService.show(EIMMessageType.error, message);
          }
          error["url"] = url;
          error["params"] = params;
          error["message"] = message;
          throw error;
        }
      });
  }
  /**
   * アップロードサービスを呼び出します.
   *
   * @param url URL
   * @param uploader ファイルアップローダ
   * @return エミッタ
   */
  public upload(
    url: string,
    uploader: FileUploader,
    fileItem: FileItem,
    params?: any,
    converter?: (json: any) => any,
    displayProgressDialog: boolean = true,
    displayErrorDialog: boolean = true
  ): EventEmitter<any> {
    let completed: EventEmitter<any> = new EventEmitter<any>();
    this.beginRequest(displayProgressDialog);
    let options: FileUploaderOptions = {
      url: this.serverConfigService.getContextPath() + url,
      method: "POST",
      itemAlias: "uploadfile",
      autoUpload: false,
    };
    options.additionalParameter = params;
    // 引数のuploaderを使用すると、個別のリクエスト単位でパラメータの設定ができないため
    // 個別にuploaderをインスタンス化する
    let myUploader: FileUploader = new FileUploader(options);
    myUploader.addToQueue([fileItem._file]);
    myUploader.onSuccessItem = (item, res: string, status: number, headers: ParsedResponseHeaders): any => {
      this.endRequest(displayProgressDialog);
      myUploader.destroy();
      let json: any = this.jsonService.xml2json(res);
      // エラーチェック
      if (json.error) {
        // セッションタイムアウトかどうかを判定する
        if (this.sessionTimeoutService.checkSessionTimeout(this.getErrorMessage(json))) {
          this.sessionTimeoutService.doSessionTimeout(this.getErrorMessage(json));
        } else {
          if (displayErrorDialog) {
            this.messageService.show(EIMMessageType.error, this.getErrorMessage(json));
          }
        }
        completed.error({
          url: this.serverConfigService.getContextPath() + url,
          uploader: uploader,
          fileItem: fileItem,
          params: params,
          message: this.getErrorMessage(json),
        });
      } else if (converter) {
        completed.emit(converter(json));
      } else {
        completed.emit(json);
      }
    };
    myUploader.onErrorItem = (item, response, status, headers) => {
      this.endRequest(displayProgressDialog);
      myUploader.destroy();
      let message: string;
      if (status == 0) {
        // フォルダ等アップロードできないファイルの場合
        message = this.translateService.instant("EIM.ERROR_0060");
      } else {
        message = this.translateService.instant("EIM.ERROR_0001");
      }
      if (displayErrorDialog) {
        this.messageService.show(EIMMessageType.error, message);
      }
      completed.error({
        url: this.serverConfigService.getContextPath() + url,
        uploader: uploader,
        fileItem: fileItem,
        params: params,
        message: message,
      });
    };
    myUploader.uploadAll();
    return completed;
  }
  /**
   * リクエストの前処理を行います.
   * @param displayProgressDialog 進捗ダイアログを表示するかどうか
   */
  public beginRequest(displayProgressDialog: boolean): void {
    this.count++;
    if (displayProgressDialog) {
      if (this.countWithoutNonDisplayProgress == 0) {
        this.started.emit();
      }
      this.countWithoutNonDisplayProgress++;
    }
  }
  /**
   * リクエストの後処理を行います.
   * @param displayProgressDialog 進捗ダイアログを表示するかどうか
   */
  public endRequest(displayProgressDialog: boolean): void {
    this.count--;
    if (this.count <= 0) {
      this.count = 0;
    }
    if (displayProgressDialog) {
      this.countWithoutNonDisplayProgress--;
      if (this.countWithoutNonDisplayProgress <= 0) {
        this.countWithoutNonDisplayProgress = 0;
        this.ended.emit();
      }
    }
  }
  /**
   * サーバからの返却値からエラーメッセージを抽出する
   * @param json サーバからの返却値
   * @return エラーメッセージ
   */
  private getErrorMessage(json: any): string {
    let message: string;
    if (json.error.attr) {
      message = json.error.attr.message;
    } else {
      message = json.error.message;
    }
    // XMLエンコードをデコードする
    message = message
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&#039;/g, "'")
      .replace(/&#034;/g, '"');
    return message;
  }
  /**
   * レスポンスをJSON形式に変換して返却します.
   * @param res レスポンス
   * @param url URL
   * @return JSON形式に変換したレスポンス
   */
  private convertJSON(res, url): any {
    if (url.indexOf(".do") > -1) {
      if (res._body == "") {
        return {};
      }
      let resultJson = null;
      try {
        resultJson = res.json();
      } catch (e) {
        resultJson = this.jsonService.xml2json(res.text());
      }
      return resultJson;
    } else {
      return this.jsonService.xml2json(res.text());
    }
  }
}
