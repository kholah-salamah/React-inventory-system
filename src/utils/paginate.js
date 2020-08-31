import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  //items ==>list items , pageNumber==> currentPage ,
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}
