from typing import Any, Dict, List, Optional

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse


app = FastAPI(
    title="Syncfusion React Chart FastAPI Backend",
    description="A simple FastAPI backend for connecting Syncfusion React Chart with remote data.",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


SALES_DATA: List[Dict[str, Any]] = [
    {"id": 1, "month": "Jan", "sales": 35, "expenses": 20, "profit": 15},
    {"id": 2, "month": "Feb", "sales": 28, "expenses": 18, "profit": 10},
    {"id": 3, "month": "Mar", "sales": 34, "expenses": 22, "profit": 12},
    {"id": 4, "month": "Apr", "sales": 32, "expenses": 19, "profit": 13},
    {"id": 5, "month": "May", "sales": 40, "expenses": 24, "profit": 16},
    {"id": 6, "month": "Jun", "sales": 45, "expenses": 27, "profit": 18},
    {"id": 7, "month": "Jul", "sales": 38, "expenses": 23, "profit": 15},
    {"id": 8, "month": "Aug", "sales": 42, "expenses": 25, "profit": 17},
    {"id": 9, "month": "Sep", "sales": 48, "expenses": 29, "profit": 19},
    {"id": 10, "month": "Oct", "sales": 50, "expenses": 30, "profit": 20},
    {"id": 11, "month": "Nov", "sales": 55, "expenses": 32, "profit": 23},
    {"id": 12, "month": "Dec", "sales": 60, "expenses": 35, "profit": 25}
]


CATEGORY_SALES_DATA: List[Dict[str, Any]] = [
    {"id": 1, "category": "Electronics", "sales": 120},
    {"id": 2, "category": "Fashion", "sales": 90},
    {"id": 3, "category": "Grocery", "sales": 150},
    {"id": 4, "category": "Books", "sales": 60},
    {"id": 5, "category": "Sports", "sales": 80},
    {"id": 6, "category": "Furniture", "sales": 110}
]


def apply_paging(
    data: List[Dict[str, Any]],
    skip: int = 0,
    take: Optional[int] = None
) -> List[Dict[str, Any]]:
    if take is None:
        return data

    return data[skip: skip + take]


def apply_sorting(
    data: List[Dict[str, Any]],
    sorted_descriptors: Any
) -> List[Dict[str, Any]]:
    if not sorted_descriptors:
        return data

    if not isinstance(sorted_descriptors, list):
        return data

    sorted_data = data.copy()

    for descriptor in reversed(sorted_descriptors):
        if not isinstance(descriptor, dict):
            continue

        field = descriptor.get("name") or descriptor.get("field")
        direction = descriptor.get("direction", "ascending").lower()

        if not field:
            continue

        reverse_sort = direction == "descending"

        sorted_data.sort(
            key=lambda item: item.get(field, ""),
            reverse=reverse_sort
        )

    return sorted_data


def apply_search(
    data: List[Dict[str, Any]],
    search_descriptors: Any
) -> List[Dict[str, Any]]:
    if not search_descriptors:
        return data

    if not isinstance(search_descriptors, list):
        return data

    filtered_data = data

    for search_item in search_descriptors:
        if not isinstance(search_item, dict):
            continue

        search_key = search_item.get("key") or search_item.get("searchKey")
        fields = search_item.get("fields", [])
        ignore_case = search_item.get("ignoreCase", True)

        if search_key is None or not fields:
            continue

        search_text = str(search_key)

        if ignore_case:
            search_text = search_text.lower()

        result = []

        for item in filtered_data:
            for field in fields:
                field_value = str(item.get(field, ""))

                if ignore_case:
                    field_value = field_value.lower()

                if search_text in field_value:
                    result.append(item)
                    break

        filtered_data = result

    return filtered_data


def compare_values(
    actual_value: Any,
    operator: str,
    expected_value: Any,
    ignore_case: bool = True
) -> bool:
    if actual_value is None:
        actual_value = ""

    if expected_value is None:
        expected_value = ""

    actual = actual_value
    expected = expected_value

    if isinstance(actual, str) and isinstance(expected, str) and ignore_case:
        actual = actual.lower()
        expected = expected.lower()

    try:
        if operator in ["equal", "equals", "=="]:
            return actual == expected

        if operator in ["notequal", "not equal", "!="]:
            return actual != expected

        if operator in ["contains"]:
            return str(expected) in str(actual)

        if operator in ["startswith"]:
            return str(actual).startswith(str(expected))

        if operator in ["endswith"]:
            return str(actual).endswith(str(expected))

        if operator in ["greaterthan", ">"]:
            return float(actual) > float(expected)

        if operator in ["greaterthanorequal", ">="]:
            return float(actual) >= float(expected)

        if operator in ["lessthan", "<"]:
            return float(actual) < float(expected)

        if operator in ["lessthanorequal", "<="]:
            return float(actual) <= float(expected)

    except Exception:
        return False

    return True


def apply_filtering(
    data: List[Dict[str, Any]],
    where_descriptors: Any
) -> List[Dict[str, Any]]:
    if not where_descriptors:
        return data

    if not isinstance(where_descriptors, list):
        return data

    filtered_data = data

    for condition in where_descriptors:
        if not isinstance(condition, dict):
            continue

        field = condition.get("field")
        operator = condition.get("operator", "equal").lower()
        value = condition.get("value")
        ignore_case = condition.get("ignoreCase", True)

        if not field:
            continue

        filtered_data = [
            item
            for item in filtered_data
            if compare_values(
                actual_value=item.get(field),
                operator=operator,
                expected_value=value,
                ignore_case=ignore_case
            )
        ]

    return filtered_data


def process_syncfusion_request(
    source_data: List[Dict[str, Any]],
    payload: Dict[str, Any]
) -> Dict[str, Any]:
    data = source_data.copy()

    search_descriptors = payload.get("search")
    where_descriptors = payload.get("where")
    sorted_descriptors = payload.get("sorted")

    data = apply_search(data, search_descriptors)
    data = apply_filtering(data, where_descriptors)

    total_count = len(data)

    data = apply_sorting(data, sorted_descriptors)

    skip = int(payload.get("skip", 0) or 0)

    take_value = payload.get("take")
    take: Optional[int] = None

    if take_value is not None:
        try:
            take = int(take_value)
        except Exception:
            take = None

    data = apply_paging(data, skip, take)

    return {
        "result": data,
        "count": total_count
    }


@app.get("/")
def root():
    return {
        "message": "FastAPI backend is running successfully.",
        "description": "Use this backend with Syncfusion React Chart.",
        "available_endpoints": {
            "monthly_sales_get": "http://localhost:8000/chart-data",
            "monthly_sales_post": "http://localhost:8000/chart-data",
            "category_sales_get": "http://localhost:8000/category-sales",
            "category_sales_post": "http://localhost:8000/category-sales",
            "swagger_docs": "http://localhost:8000/docs"
        }
    }


@app.get("/chart-data")
def get_chart_data():
    return JSONResponse(
        content=SALES_DATA
    )


@app.post("/chart-data")
async def post_chart_data(payload: Dict[str, Any]):
    response = process_syncfusion_request(
        source_data=SALES_DATA,
        payload=payload
    )

    return JSONResponse(
        content=response
    )


@app.get("/category-sales")
def get_category_sales():
    return JSONResponse(
        content=CATEGORY_SALES_DATA
    )


@app.post("/category-sales")
async def post_category_sales(payload: Dict[str, Any]):
    response = process_syncfusion_request(
        source_data=CATEGORY_SALES_DATA,
        payload=payload
    )

    return JSONResponse(
        content=response
    )


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "message": "Backend API is working."
    }