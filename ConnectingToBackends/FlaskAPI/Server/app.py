from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS to allow React frontend to call Flask backend
CORS(app)

# Simple static data for chart
sales_data = [
    {
        "month": "Jan",
        "sales": 35,
        "expenses": 20
    },
    {
        "month": "Feb",
        "sales": 28,
        "expenses": 18
    },
    {
        "month": "Mar",
        "sales": 34,
        "expenses": 22
    },
    {
        "month": "Apr",
        "sales": 32,
        "expenses": 24
    },
    {
        "month": "May",
        "sales": 40,
        "expenses": 25
    },
    {
        "month": "Jun",
        "sales": 45,
        "expenses": 30
    },
    {
        "month": "Jul",
        "sales": 50,
        "expenses": 28
    },
    {
        "month": "Aug",
        "sales": 48,
        "expenses": 32
    },
    {
        "month": "Sep",
        "sales": 55,
        "expenses": 35
    },
    {
        "month": "Oct",
        "sales": 60,
        "expenses": 38
    },
    {
        "month": "Nov",
        "sales": 65,
        "expenses": 40
    },
    {
        "month": "Dec",
        "sales": 70,
        "expenses": 42
    }
]


@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Flask API is running successfully",
        "salesApi": "http://127.0.0.1:5000/api/sales"
    })


@app.route("/api/sales", methods=["GET"])
def get_sales_data():
    return jsonify({
        "result": sales_data,
        "count": len(sales_data)
    })


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )