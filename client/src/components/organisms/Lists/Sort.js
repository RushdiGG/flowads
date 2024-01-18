import React from "react";

// Compare functions needed by the Sort component
const title = (asc) => (a, b) => {
  if (a.props.title < b.props.title) {
    return asc ? -1 : 1;
  }
  if (a.props.title > b.props.title) {
    return !asc ? -1 : 1;
  }

  return 0;
  // you can access the relevant property like this a.props[by]
  // depending whether you are sorting by tilte or year, you can write a compare function here,
};

const status = (asc) => (a, b) => {
  return a.props.checked === b.props.checked ? 0 : a.props.checked ? -1 : 1;
};

export default function Sort({ children, by, asc = true }) {
  const comparations = {
    title: title,
    status: status,
  };

  if (!by) {
    // If no 'sort by property' provided, return original list
    return children;
  }
  return React.Children.toArray(children).sort(comparations[by](asc));
}
