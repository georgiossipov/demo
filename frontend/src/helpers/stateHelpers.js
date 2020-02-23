import {hostProperties} from "../constants";
import _ from "lodash";

export const cloneState = (state, action) => {
  const clonedState = _.cloneDeep(state);
  const {payload} = action;
  return {clonedState, payload};
};

export const enrichHostData = (hosts) => {
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
};