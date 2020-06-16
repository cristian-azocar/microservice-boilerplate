import { Middleware } from 'koa';
import koaSwagger from 'koa2-swagger-ui';
import yaml from 'js-yaml';
import fs from 'fs';
import jsonRefs from 'json-refs';

export default class ApiDocsUtils {
  private openApiPath = './docs/index.yml';
  private jsonRefsOptions: jsonRefs.JsonRefsOptions = {
    location: this.openApiPath,
    loaderOptions: {
      /* istanbul ignore next */
      processContent(res: any, callback: Function): void {
        callback(yaml.safeLoad(res.text));
      },
    },
  };

  private async getJsonResolved(): Promise<object> {
    const yamlContent: string = fs.readFileSync(this.openApiPath, 'utf-8');
    const jsonContent: object = yaml.safeLoad(yamlContent);
    const results: jsonRefs.ResolvedRefsResults = await jsonRefs.resolveRefs(
      jsonContent,
      this.jsonRefsOptions
    );

    return results.resolved;
  }

  async getSwaggerMiddleware(): Promise<Middleware> {
    const jsonResolved: object = await this.getJsonResolved();

    return koaSwagger({
      routePrefix: false,
      swaggerOptions: { spec: jsonResolved },
    });
  }
}
