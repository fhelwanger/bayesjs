import { INetwork, INode } from '../../types'
import { forEach, has, isNil, toString, type } from 'ramda'

import { isNotString } from '../../utils'

const checkIfParentsExist = ({ id, parents }: INode, network: INetwork) => {
  forEach(parentId => {
    if (isNotString(parentId)) {
      throw new Error(`[Node "${id}"]: All node parents must be strings.

Node parent type: ${type(parentId)}
Node parent: ${toString(parentId)}
Node parents: ${toString(parents)}`)
    }

    if (!has(parentId, network)) {
      throw new Error(`[Node "${id}"]: The node parent "${parentId}" was not found in the network.`)
    }
  }, parents)
}

export default (node: INode, network: INetwork) => {
  if (isNil(node.parents)) {
    throw new Error(`[Node "${node.id}"]: The node parents is required and must be an array of strings.

Node: ${toString(node)}`)
  }

  if (!Array.isArray(node.parents)) {
    throw new Error(`[Node "${node.id}"]: The node parents must be an array of strings.

Node parents type: ${type(node.parents)}
Node parents: ${toString(node.parents)}`)
  }

  checkIfParentsExist(node, network)
}
