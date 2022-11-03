const addStylesUsingQuery = (querys: string[], styles: React.CSSProperties) => {
  querys.forEach((query) => {
    document.querySelectorAll<HTMLElement>(query).forEach((element) => {
      const keys = Object.keys(styles)

      keys.forEach((key) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        element.style[key] = styles[key]
      })
    })
  })
}

export default addStylesUsingQuery