const removeElementsByQuery = (querys: string[]) => {
  querys.forEach((query) => {
    document.querySelectorAll(query).forEach((element) => {
      element.remove()
    });
  })
}

export default removeElementsByQuery;