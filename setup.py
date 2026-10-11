from setuptools import setup, find_packages

setup(
    name="zsyio-company-backend",
    version="1.0.0",
    package_dir={"": "backend"},
    packages=find_packages(where="backend"),
    py_modules=["keep_alive"] if True else [],
)
