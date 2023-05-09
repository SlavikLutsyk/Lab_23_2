'use strict'

const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')

const shipListService = require('../services/Ship.all')
const shipCreateService = require('../services/ship.create')
const shipUpdateService = require('../services/Ship.update')
const shipBuIdService = require('../services/Ship.byId')
const shipDeleteService = require('../services/Ship.delete')

function _getMockShip(id = null) {
  return {
    id: 666,
    name: '',
    number: 99,
    tonnage:9,
    sediment:4

  }
}

module.exports = {
  index(req, res) {
    res.render('pages/ship/index')
  },
  async shipList(req, res) {
    try {
      const shipList = await shipListService()
      res.render('pages/ship/list', {
        ships: shipList,
      })
    } catch (error) {
      res.render('pages/ship/list', {
        ships: [],
        errors: [{ msg: error.message }],
      })
    }
  },
  createShipForm(req, res) {
    res.render('pages/ship/add')
  },
  postCreateShip: [
    async (req, res) => {
      // const success = true
      const shipData = req.body
      const errors = validationResult(req)

      if (errors.isEmpty()) {
        try {
          const ship = await shipCreateService(shipData)
          req.flash('info', `Ship "${ship.name}" is Added`)
          res.redirect('/ship/list')
        } catch (error) {
          res.render('pages/ship/add', {
            errors: [{ msg: error.message }],
          })
        }
      } else {
        res.render('pages/ship/add', {
          errors: errors.array(),
        })
      }
    },
  ],
  async updateShipForm(req, res) {
    const entity = await shipBuIdService(req.params.id)

    res.render('pages/ship/update', { ship: entity })
  },
  async putUpdateShip(req, res) {
    const success = true
    const shipData = req.body
    const shipId = req.params.id
    const mockShip = _getMockShip(shipId)
    // const mockProduct = _getMockProduct(productData.id)

    if (success) {
      const updatedShip = await shipUpdateService({
        ...shipData,
        id: shipId,
      })
      req.flash('info', `Ship "#${shipId} ${shipData.name}" is Updated`)
      res.redirect('/item/list')
    } else {
      res.render('pages/ship/update', {
        ship: mockShip,
        newShip: shipData,
        errors: [{ msg: 'Error Omg' }],
      })
    }
  },
  async deleteShipFrom(req, res) {
    const entity = await shipBuIdService(req.params.id)

    res.render('pages/ship/delete', { ship: entity })
  },
  async deleteShip(req, res) {
    const success = true
    const shipData = req.body
    const shipId = req.params.id
    const mockShip = _getMockShip(shipId)

    if (success) {
      const deletedShip = await shipDeleteService({id: shipId})
      req.flash('info', `Ship "#$shipId} ${mockShip.name}" is Deleted`)
      res.redirect('/ship/list')
    } else {
      res.render('pages/ship/delete', {
        ship: mockShip,
        errors: [{ msg: 'Error Omg' }],
      })
    }
  },
}
