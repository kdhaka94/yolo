# YOLO - You Only Load Once

YOLO (You Only Load Once) is a flexible environment loader for Node.js applications. It allows you to easily switch between different environment configurations without modifying your code.

## Features

- Simple YAML-based configuration
- Interactive environment selection
- Easy integration with existing Node.js projects
- Support for multiple environments
- Seamless use with npm scripts

## Installation

You can install YOLO globally or as a dev dependency in your project.

### Global Installation

```bash
npm install -g yolo-env-loader
```

### Local Installation

```bash
npm install --save-dev yolo-env-loader
```

## Configuration

1. Create a `yolo.yml` file in your project root directory with the following structure:

```yaml
environments:
  development: .env.development
  staging: .env.staging
  production: .env.production
```

You can add as many environments as you need, mapping each environment name to its corresponding `.env` file.

2. Create the necessary `.env` files for each environment (e.g., `.env.development`, `.env.staging`, `.env.production`).

## Usage

### With npm scripts

Modify your `package.json` to use YOLO as a pre-start command:

```json
"scripts": {
  "prestart": "yolo start",
  "start": "node your-app.js"
}
```

Now, when you run `npm start`, YOLO will prompt you to select an environment before starting your application.

### Manual Execution

You can also run YOLO manually:

```bash
yolo your-command
```

Replace `your-command` with the command you want to run after loading the environment.

## How It Works

1. When executed, YOLO reads the `yolo.yml` configuration file.
2. It prompts you to select an environment from those defined in `yolo.yml`.
3. YOLO loads the environment variables from the corresponding `.env` file.
4. Finally, it executes the specified command (e.g., starting your application).

## Example

Assuming you have the following `yolo.yml`:

```yaml
environments:
  development: .env.development
  production: .env.production
```

And you run `npm start`, you'll see:

```
YOLO - You Only Load Once
YOLO: Select environment (development/production): 
```

After selecting an environment, YOLO will load the appropriate `.env` file and start your application.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.