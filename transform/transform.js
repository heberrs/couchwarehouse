const f = (doc) => {
  const DEVEDORES = 'devedores'
  const DIVIDA_ATIVA_UNIAO = 'documentos'
  const OUTRO = 'outros'
  const TYPE_DOC_DEV = '-dev'
  const TYPE_DOC_DIVIDA_ATIVA = 'doc1'

  let retry = false
  const typeDoc = doc._id.slice(-4)
  if (!doc.typeDoc) {
    switch (typeDoc) {
      case TYPE_DOC_DEV:
        doc.typeDoc = DEVEDORES
        break
      case TYPE_DOC_DIVIDA_ATIVA:
        doc.typeDoc = DIVIDA_ATIVA_UNIAO
        break
      default:
        doc.typeDoc = OUTRO
        break
    }
  }

  if (doc.typeDoc === DEVEDORES && !doc.processado) {
    const index = doc.devedores.length - 1
    const devedor = doc.devedores[index]
    doc = { ...doc, ...devedor }
    doc._id = doc.nuCpfCnpjDevedor
    doc.devedores.splice(index)
    doc.processado = true
    delete doc.devedores
    if (index > 0) {
      retry = true
    }
  }

  return { doc, retry }
}

// export the function
module.exports = f
