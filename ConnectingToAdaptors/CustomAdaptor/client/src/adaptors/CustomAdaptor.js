import { UrlAdaptor } from '@syncfusion/ej2-data';

export class CustomAdaptor extends UrlAdaptor {
  processQuery(dm, query) {
    query.addParams('source', 'syncfusion-react-chart');
    return super.processQuery.apply(this, arguments);
  }

  beforeSend(dm, request) {
    if (request && request.setRequestHeader) {
      request.setRequestHeader('Authorization', 'Bearer sample-token');
      request.setRequestHeader('Custom-Header', 'Chart-Custom-Adaptor');
    }
  }

  processResponse(data, ds, query, xhr, request, changes) {
    const response = super.processResponse(
      data,
      ds,
      query,
      xhr,
      request,
      changes
    );

    if (response && response.result) {
      response.result = response.result.map((item) => ({
        x: item.month_name,
        y: item.sales_amount
      }));
    }

    return response;
  }
}