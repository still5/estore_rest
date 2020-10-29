# estore_rest
# This is some e-store backend project

Database model: https://whimsical.com/TSYLHMhnyV2Pp13WWhjr4q


API logic (routing)
The request expected to contain JSON. Method defines the type of CRUD operation.
The response returns the content in its body in JSON format
Port: 3000

Create      = POST request to /<entities> (e.g :3000/categories).
Read (all)  = GET request to /<entities> url = get all products (or other entities).
Read (one)  = GET request with id specified, e.g :3000/suppliers/5f9a2df5412bcb0228a05c8a = get the supplier (the one with the specified ID).
Update      = PUT request to /<entities>/<id>. For example, :3000/categories/a2df5412bcb0228a0 = update selected category.
Delete      = DELETE request to /<entities>/<id>, e.g :3000/categories/a2df5412bcb0228a0 = delete selected product.
