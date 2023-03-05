const Menu = require('../models/menu');

exports.getAllMenuByRestaurantName = (req, res) => {
  const filter = { restaurantName: req.params.rName };

  Menu.find(filter)
    .then((result) => {
      res
        .status(200)
        .json({ message: 'Menu fetched successfully', data: result });
    })
    .catch((e) => res.status(500).json({ message: 'Error in DB', error: e }));
};

exports.getMenu = (req, res) => {
  Menu.find()
    .then((result) => {
      res.status(200).json({
        message: 'All menu are fetched successfully',
        data: result,
      });
    })
    .catch((e) => res.status(500).json({ message: 'Error in DB', error: e }));
};
