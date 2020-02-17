import {hostProperties} from "../constants";
import _ from "lodash";

export function enrichHostData(hosts) {
  const {fields} = hostProperties;
  return _.map(hosts, host => {
    const enrichedHost = {};
    _.forEach(fields, field => {
      if (field in host) {
        enrichedHost[field] = host[field];
      } else {
        enrichedHost[field] = null;
      }
    });
    return enrichedHost;
  });
}